import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ){}


    getAllUsers(){
        return this.usersRepository.find()
    }

    public async createUser(userDto: CreateUserDto) {
        const user =  await this.usersRepository.findOne({
            where:{ email: userDto.email }
        })

        if(user){
            return {
                message: "User already exists"
            }
        }

        let newUser = this.usersRepository.create(userDto)
        newUser = await this.usersRepository.save(newUser)

        return newUser
    }
}