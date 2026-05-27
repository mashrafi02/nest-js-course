import { Injectable, Inject} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '../users/dtos/createUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>
    ) {}

    isAuthenticated: boolean = false;

    login(email: string, password: string) {
        console.log(this.authConfiguration);
        return {email, password}
    }

    public async signup(createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }
}
