import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message-dto';
import { UsersService } from '../users/users.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,

        private readonly hasgtagService: HashtagService
    ) {}


    public async getMessageByUserId(userId: number): Promise<Message[]> {

        const user = await this.usersService.findUserById(userId);

        if(!user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        
        return await this.messageRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                user: true,
                hashtags: true
            },
        });
    }

    public async CreateMessage(createMessageDto: CreateMessageDto){
        const user = await this.usersService.findUserById(createMessageDto.userId);

        if(!user){
            throw new NotFoundException(`User with id ${createMessageDto.userId} not found`);
        }    

        const hashtags = createMessageDto.hashtags ? await this.hasgtagService.findHashtagByIds(createMessageDto.hashtags) : [];

        const message = this.messageRepository.create({
            ...createMessageDto,
            user,
            hashtags
        });

        return await this.messageRepository.save(message);
    }

    public async UpdateMessage(updateMessageDto: UpdateMessageDto){
        const message = await this.messageRepository.findOne({
            where: {
                id: updateMessageDto.id
            }
        });

        if(!message){
            throw new NotFoundException(`Message with id ${updateMessageDto.id} not found`);
        }

        const hashtags = updateMessageDto.hashtags ? await this.hasgtagService.findHashtagByIds(updateMessageDto.hashtags) : [];

        message.text = updateMessageDto.text ?? message.text;
        message.image = updateMessageDto.image ?? message.image;
        message.hashtags = hashtags;

        return await this.messageRepository.save(message);
    }

    public async DeleteMessage(id: number){
        const message = await this.messageRepository.findOne({
            where: {
                id: id
            }
        });

        if(!message){
            throw new NotFoundException(`Message with id ${id} not found or already deleted`);
        }

        await this.messageRepository.delete({id: message.id});

        return {
            message: `Message with id ${id} deleted successfully`
        };
    }
}
