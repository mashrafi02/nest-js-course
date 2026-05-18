import { NotFoundException, Injectable, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
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

        const existingUser = await this.usersRepository.findOne({
            where: [
                { username: userDto.username },
                { email: userDto.email }
            ]
        });

        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
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