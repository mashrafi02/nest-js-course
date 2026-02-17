import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/createUser.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAllUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ){  
        console.log(limit, page);
        
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
    createUser(@Body(new ValidationPipe()) user: CreateUserDto){
        return {
            message:"A new user has been created",
            user
        }
    }
}