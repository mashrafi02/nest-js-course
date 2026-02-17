import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [UsersModule],
})
export class MessageModule {}
