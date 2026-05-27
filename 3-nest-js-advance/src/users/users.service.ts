import { NotFoundException, Injectable, HttpException, HttpStatus, Inject, forwardRef, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserAlreadyExistsException } from "../CustomExceptions/user-already-exists-exception";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";
import { Paginater } from "../common/pagination/paginater.interface";
import { PaginationProvider } from "../common/pagination/pagination.provider";
import { HashingProvider } from "../auth/provider/hashing.provider";


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

        private readonly paginationProvider: PaginationProvider,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ){}


    public async getAllUsers(paginationQueryDto: PaginationQueryDto) : Promise<Paginater<Users>>{
        const NODE_ENV = process.env.NODE_ENV;
        console.log('Current Environment:', NODE_ENV);

        return await this.paginationProvider.paginatedQuery<Users>(
            paginationQueryDto,
            this.usersRepository
        );
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
        const hashedUser = await this.usersRepository.save(
            {
                ...newUser,
                password: await this.hashingProvider.hashPassword(userDto.password)
            }
        );

        delete hashedUser.password;

        return hashedUser;
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

    async findUserByUsername(username: string) : Promise<Users | null> {
        const user = await this.usersRepository.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'User not found',
                table: 'users'
            });
        }

        return user;
    }

    
}