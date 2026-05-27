import { Controller, Delete, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    getAllUsers(
        @Query() paginationQueryDto: PaginationQueryDto
    ){  
        return this.usersService.getAllUsers(paginationQueryDto)
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }


    // @Post()
    // createUser(@Body() user: CreateUserDto){
    //     return this.usersService.createUser(user)
    // }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}