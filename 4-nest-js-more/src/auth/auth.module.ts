import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import authConfig from './config/auth.config';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  controllers: [AuthController],
  providers: [
                AuthService,
                {
                  provide: HashingProvider,
                  useClass: BcryptProvider,
                },
                {
                  provide:APP_GUARD,
                  useClass: ThrottlerGuard
                }
              ],
  exports: [
              AuthService, 
              HashingProvider
            ],
  imports: [
              forwardRef(() => UsersModule),
              ConfigModule.forFeature(authConfig),
              JwtModule.registerAsync(authConfig.asProvider()),
              ThrottlerModule.forRoot([
                {
                  name: 'short',
                  ttl: 1000,    // 1 second
                  limit: 3,     // max 3 req/sec (burst protection)
                },
                {
                  name: 'long',
                  ttl: 60000,   // 1 minute
                  limit: 5,   // max 100 req/min (sustained protection)
                },
              ]),
            ],
})
export class AuthModule {}
