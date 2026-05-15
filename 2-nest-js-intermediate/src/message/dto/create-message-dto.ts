import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";




export class CreateMessageDto {

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    image?: string; 

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsOptional()
    @IsInt({ each: true })
    @IsArray()
    hashtags?: number[];
}