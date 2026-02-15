import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAllUsers(
        @Query() queryString: any
    ){  
        if(queryString.gender){
            return this.usersService.getAllUsers().find(user => user.gender === queryString.gender)
        }
        
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(
        @Param('id') id:string
    ){
        return this.usersService.getUserById(+id)
    }

    // the 'id' in Param gives us a specific route parameter. if we want all the parameters, just leave the parenthisis empty. that's way we'll get all the route parameters as an single object. this logic is also applicable to query strings 

    @Post()
    createUser(){
        const user = {id:3, name:'cena', age:40, gender:'male'};

        this.usersService.createUser(user);

        return {
            message:"A new user has been created",
            user
        }
    }
}