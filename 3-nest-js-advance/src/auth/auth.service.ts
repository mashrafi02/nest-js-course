import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { forwardRef } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

type JwtPayload = {
    sub: number;
};

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly hashingProvider: HashingProvider,

        private readonly jwtService: JwtService,
    ) {}

    isAuthenticated: boolean = false;

    // login(email: string, password: string) {
    //     console.log(this.authConfiguration);
    //     return {email, password}
    // }

    public async signup(createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    async login(loginDto: LoginDto) {
        const userExist = await this.usersService.findUserByUsername(loginDto.username);

        let isEqual : boolean = false;

        isEqual = await this.hashingProvider.comparePassword(loginDto.password, userExist.password);

        if (!isEqual) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } = await this.generateTokens(userExist);

        return { message: 'Login successful', accessToken, refreshToken };
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {


        try {
            const {sub} = await this.jwtService.verifyAsync<JwtPayload>(refreshTokenDto.refreshToken, {
                secret: this.authConfiguration.secret,
                audience: this.authConfiguration.audience,
                issuer: this.authConfiguration.issuer,
            });

            const user = await this.usersService.findUserById(sub);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const { accessToken, refreshToken } = await this.generateTokens(user);

            return { message: 'Token refreshed successfully', accessToken, refreshToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token', { cause: error });
        }
    }

    private async signToken(userId: number, expiresIn: number, payload?: Record<string, unknown>): Promise<string> {
        const tokenPayload = { sub: userId, ...payload };
        return await this.jwtService.signAsync(tokenPayload, {
            secret: this.authConfiguration.secret,
            expiresIn,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer,
        });
    }

    private async generateTokens(user: Users): Promise<{ accessToken: string; refreshToken: string }> {

        const accessToken = await this.signToken(user.id, this.authConfiguration.expiresIn, { username: user.username });

        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshExpiresIn);

        return { accessToken, refreshToken };
    }
}