import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessageService {
    constructor(private readonly usersService: UsersService) {}


    getMesasgeByUserId(userId: number){

    }
}
