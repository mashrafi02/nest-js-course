import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule,
            MessageModule, 
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
              load: [appConfig, databaseConfig],
            }), 
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                return {
                  type: "postgres",
                  // entities: [Users],
                  url: configService.get<string>('database.dbUrl'),
                  synchronize: configService.get<boolean>('database.synchronize'),
                  autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'), // this will automatically load all entities from the modules
                  ssl: {
                      rejectUnauthorized: false,
                    },
                }
              }
            }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
