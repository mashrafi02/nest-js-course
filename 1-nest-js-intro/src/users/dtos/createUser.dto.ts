import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

// the front end input fields must follow the the structure od these DTO fields

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    @MaxLength(255, {message: 'Name must be less than 255 characters long'})
    first_name: string;

    @IsString()
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    @MaxLength(255, {message: 'Name must be less than 255 characters long'})
    last_name: string;

    @IsNotEmpty({message: 'Age is required'})
    age: number;

    @IsString()
    @IsOptional()
    gender?: string

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email address'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    password: string;
}