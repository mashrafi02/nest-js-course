import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message-dto';

@Controller('message')
export class MessageController {
    constructor( private readonly messageService: MessageService) {}

    @Get(':userId')
    getMessageByUserId(@Param('userId') userId: number) {
        return this.messageService.getMessageByUserId(userId);
    }

    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.CreateMessage(createMessageDto);
    }
}
