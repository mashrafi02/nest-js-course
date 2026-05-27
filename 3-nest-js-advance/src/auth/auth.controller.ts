import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto){
        return this.authService.signup(createUserDto);
    }
}