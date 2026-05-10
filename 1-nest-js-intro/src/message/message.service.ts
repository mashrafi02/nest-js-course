import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message-dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessageService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}


    public async getMessageByUserId(userId: number): Promise<Message[]> {
        return await this.messageRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                user: true,
            },
        });
    }

    public async CreateMessage(createMessageDto: CreateMessageDto){
        const user = await this.usersService.findUserById(createMessageDto.userId);
        if(!user){
            throw new NotFoundException('User not found');
        }    

        const message = this.messageRepository.create({
            ...createMessageDto,
            user
        });
        return await this.messageRepository.save(message);
    }
}
