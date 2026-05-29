import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message-dto';
import { UsersService } from '../users/users.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { Paginater } from '../common/pagination/paginater.interface';
import { ActiveUserType } from '../auth/interfaces/active-user.interface';

@Injectable()
export class MessageService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,

        private readonly hasgtagService: HashtagService,

        private readonly paginationProvider: PaginationProvider
    ) {}


    public async getMessageByUserId(userId: number, paginationQueryDto: PaginationQueryDto): Promise<Paginater<Message>> {

        const user = await this.usersService.findUserById(userId);

        if(!user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        
        return await this.paginationProvider.paginatedQuery<Message>(
            paginationQueryDto,
            this.messageRepository,
            {
                user: {
                    id: userId
                }
            },
            {
                user: true,
                hashtags: true
            }
        );
    }

    public async CreateMessage(createMessageDto: CreateMessageDto, user: ActiveUserType){
        const userEntity = await this.usersService.findUserById(user.sub);

        if(!userEntity){
            throw new NotFoundException(`User with id ${user.sub} not found`);
        }    

        const hashtags = createMessageDto.hashtags ? await this.hasgtagService.findHashtagByIds(createMessageDto.hashtags) : [];

        const message = this.messageRepository.create({
            ...createMessageDto,
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
