import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { HashtagModule } from '../hashtag/hashtag.module';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [UsersModule, HashtagModule, TypeOrmModule.forFeature([Message]), PaginationModule],
})
export class MessageModule {}
