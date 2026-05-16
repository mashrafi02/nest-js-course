import { NotFoundException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ){}


    getAllUsers(){
        const NODE_ENV = process.env.NODE_ENV;
        console.log('Current Environment:', NODE_ENV);

        return this.usersRepository.find({
            relations: {
                profile: true
            }
        })
    }

    public async createUser(userDto: CreateUserDto) {
        
        userDto.profile = userDto.profile ?? {};

        const newUser = this.usersRepository.create(userDto);
      
        return await this.usersRepository.save(newUser);
    }

    public async deleteUser(userId: number) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: {
                profile: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.usersRepository.remove(user);
    }

    public async findUserById(id: number): Promise<Users | null>{
        return await this.usersRepository.findOneBy({ id });
    }
}