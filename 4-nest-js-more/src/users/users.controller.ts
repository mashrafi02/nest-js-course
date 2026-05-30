import { Controller, Delete, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../constants/constants";
// import { AuthorizeGuard } from "../auth/guards/authorize.guard";


@Controller('users')
// @UseGuards(AuthorizeGuard)
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

    @Roles(Role.Admin)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}