import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { GetUserParamDto } from "./dtos/getUserParamDto";
import { UpdateUserDto } from "./dtos/updateUser.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAllUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query() param: GetUserParamDto
    ){  
        console.log(limit, page, param, param instanceof GetUserParamDto) 
        
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.usersService.getUserById(id)
    }

    // the 'id' in Param gives us a specific route parameter. if we want all the parameters, just leave the parenthisis empty. that's way we'll get all the route parameters as an single object. this logic is also applicable to query strings 

    @Post()
    createUser(@Body() user: CreateUserDto){
        return {
            message:"A new user has been created",
            user
        }
    }

    @Patch()
    updateUser(@Body() body: UpdateUserDto){
        return {
            message: "User has been updated",
            body
        }
    }
}