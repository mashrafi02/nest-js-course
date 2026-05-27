import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/profile.entity";
import { PaginationModule } from "../common/pagination/pagination.module";


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([Users, Profile]), PaginationModule]
})
export class UsersModule {

}