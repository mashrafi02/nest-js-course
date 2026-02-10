import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UsersModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
