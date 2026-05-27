import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { forwardRef } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly hashingProvider: HashingProvider
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

        return { message: 'Login successful' };
    }
}
