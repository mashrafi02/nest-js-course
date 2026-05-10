import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [UsersModule, TypeOrmModule.forFeature([Message])],
})
export class MessageModule {}
