import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import authConfig from './config/auth.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [AuthService],
  imports: [UsersModule, ConfigModule.forFeature(authConfig)],
})
export class AuthModule {}
