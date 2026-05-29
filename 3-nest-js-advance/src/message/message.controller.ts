import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';

type AuthenticatedRequest = Request & {
    user?: unknown;
};

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
    createMessage(@Body() createMessageDto: CreateMessageDto, @Req() request: AuthenticatedRequest) {
        // return this.messageService.CreateMessage(createMessageDto);
        console.log(request?.user);
        
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
