import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    getAllUsers(
    ){  
        return this.usersService.getAllUsers()
    }


    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.usersService.createUser(user)
    }

    @Patch()
    updateUser(@Body() body: UpdateUserDto){
        return {
            message: "User has been updated",
            body
        }
    }
}