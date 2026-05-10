import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessageService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}


    getMesasgeByUserId(userId: number){

    }

    public async CreateMessage(createMessageDto: CreateMessageDto){
        const user = await this.usersService.FindUserById(createMessageDto.userId);
        if(!user){
            throw new Error('User not found');
        }    

        let message = await this.messageRepository.create({
            ...createMessageDto,
            user
        });
        return await this.messageRepository.save(message);
    }
}
