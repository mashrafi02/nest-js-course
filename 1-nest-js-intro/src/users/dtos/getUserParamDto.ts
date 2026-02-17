import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";



export class GetUserParamDto {

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean) // this will transform the query string value to a boolean
    isMarried: boolean;
}