import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/profile.entity";


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([Users, Profile])]
})
export class UsersModule {

}