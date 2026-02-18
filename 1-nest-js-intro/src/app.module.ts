import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.entity';
 


@Module({
  imports: [UsersModule,
            MessageModule, 
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true,
            }), 
            TypeOrmModule.forRootAsync({
              imports: [],
              inject: [],
              useFactory: () => {
                return {
                  type: "postgres",
                  entities: [Users],
                  url: process.env.DATABASE_URL,
                  synchronize: true,
                  autoLoadEntities: true,
                  ssl: {
                      rejectUnauthorized: false,
                    },
                }
              }
            })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
