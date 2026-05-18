import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/createUser.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    getAllUsers(
    ){  
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }


    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.usersService.createUser(user)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}