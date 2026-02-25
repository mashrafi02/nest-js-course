import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

// the front end input fields must follow the the structure od these DTO fields

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({message: 'username is required'})
    @MaxLength(24, {message: 'username must be less than 24 characters long'})
    username: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email address'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    password: string;
}