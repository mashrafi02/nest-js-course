import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import type { ActiveUserType } from '../auth/interfaces/active-user.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../constants/constants';

// type AuthenticatedRequest = Request & {
//     user?: unknown;
// };

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
    createMessage(@Body() createMessageDto: CreateMessageDto, @ActiveUser() user: ActiveUserType) {
        return this.messageService.CreateMessage(createMessageDto, user);
    }

    @Patch()
    updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
        return this.messageService.UpdateMessage(updateMessageDto);
    }
    
    
    @Delete(':id')
    @Roles(Role.Admin)
    deleteMessage(@Param('id', ParseIntPipe) id: number) {
        return this.messageService.DeleteMessage(id);
    }
}
