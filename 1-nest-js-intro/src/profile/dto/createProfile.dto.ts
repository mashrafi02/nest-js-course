import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto {

    @IsString()
    @IsOptional()
    @MinLength(3, {message: 'First name must be at least 3 characters long'})
    @MaxLength(100, {message: 'First name must be less than 100 characters long'})
    first_name?: string;

    @IsString()
    @IsOptional()
    @MinLength(3, {message: 'Last name must be at least 3 characters long'})
    @MaxLength(100, {message: 'Last name must be less than 100 characters long'})
    last_name?: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsDate()
    @IsOptional()
    dateOfBirth?: Date;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255, {message: 'Profile picture URL must be less than 255 characters long'})
    avatarUrl?: string;
} 