import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() user: { email: string; password: string }){
        return this.authService.login(user.email, user.password);
    }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto){
        return this.authService.signup(createUserDto);
    }
}