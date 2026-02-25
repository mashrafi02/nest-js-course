import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
 


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
                  // entities: [Users],
                  url: process.env.DATABASE_URL,
                  synchronize: true,
                  autoLoadEntities: true, // this will automatically load all entities from the modules
                  ssl: {
                      rejectUnauthorized: false,
                    },
                }
              }
            }), ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
