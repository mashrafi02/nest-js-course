import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessageService {
    constructor(private readonly usersService: UsersService) {}

    messages: {text:string, date: Date, userId: number}[] = [
        {text: 'Hello World', date: new Date('2024-11-12'), userId: 1},
        {text: 'Hello NestJS', date: new Date(), userId: 2},
        {text: 'Hello TypeScript', date: new Date(), userId: 3},
    ];


    getMesasgeByUserId(userId: number){

    }
}
