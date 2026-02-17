import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor( private readonly messageService: MessageService) {}

    @Get(':userId')
    getMessageByUserId(@Param('userId') userId: number) {
        return this.messageService.getMesasgeByUserId(userId);
    }
}
