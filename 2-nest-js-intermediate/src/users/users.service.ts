import { NotFoundException, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserAlreadyExistsException } from "../CustomExceptions/user-already-exists-exception";


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

        const existingUserByUsername = await this.usersRepository.findOne({
            where: [
                { username: userDto.username },
            ]
        });

        if (existingUserByUsername) {
            throw new UserAlreadyExistsException("username", userDto.username);
        }

        const existingUserByEmail = await this.usersRepository.findOne({
            where: [
                { email: userDto.email },
            ]
        });

        if (existingUserByEmail) {
            throw new UserAlreadyExistsException("email", userDto.email);
        }
        
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
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found',
                table: 'users'
            }, HttpStatus.NOT_FOUND);
        }

        return user;
    }
}