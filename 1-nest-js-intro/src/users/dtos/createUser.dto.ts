import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

// the front end input fields must follow the the structure od these DTO fields

export class CreateUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    name: string;

    @IsNotEmpty({message: 'Age is required'})
    age: number;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email address'})
    email: string;

    @IsOptional()
    gender?: string
}