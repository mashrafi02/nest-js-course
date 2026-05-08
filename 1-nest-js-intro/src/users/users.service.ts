import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { Profile } from "../profile/profile.entity";


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}


    getAllUsers(){
        return this.usersRepository.find()
    }

    public async createUser(userDto: CreateUserDto) {
        
        userDto.profile = userDto.profile ?? {};

        const newUser = this.usersRepository.create(userDto);
      
        return await this.usersRepository.save(newUser);
    }
}