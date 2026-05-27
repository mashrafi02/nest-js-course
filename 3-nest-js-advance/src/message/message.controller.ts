import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';

@Controller('message')
export class MessageController {
    constructor( private readonly messageService: MessageService) {}

    @Get(':userId')
    getMessageByUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Query() paginationQueryDto : PaginationQueryDto
    ) {
        // console.log(paginationQueryDto);
        
        return this.messageService.getMessageByUserId(userId, paginationQueryDto);
    }

    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.CreateMessage(createMessageDto);
    }

    @Patch()
    updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
        return this.messageService.UpdateMessage(updateMessageDto);
    }
    
    @Delete(':id')
    deleteMessage(@Param('id', ParseIntPipe) id: number) {
        return this.messageService.DeleteMessage(id);
    }
}
