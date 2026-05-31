import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import envValidationSchema from './config/env.validation';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import authConfig from './auth/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './auth/guards/roles.guard';
import { cloudinaryConfig } from './config/cloudinary.config';
import { UploadModule } from './upload/upload.module';
import { redisConfig } from './config/redis.config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppCacheModule } from './cache/cache.module';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule,
            MessageModule, 
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
              load: [appConfig, databaseConfig, cloudinaryConfig, redisConfig],
              validationSchema: envValidationSchema,
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
            }), 
            ProfileModule, 
            HashtagModule, 
            PaginationModule,
            ConfigModule.forFeature(authConfig),
            JwtModule.registerAsync(authConfig.asProvider()),
            UploadModule,
            CacheModule.registerAsync({
              isGlobal: true,       // available in every module without importing
              useFactory: async (config: ConfigType<typeof redisConfig>) => ({
                store: await redisStore({
                  socket: {
                    host: config.host,
                    port: config.port,
                  },
                }),
                ttl: 60 * 1000,     // default TTL: 60 seconds (in ms)
              }),
              inject: [redisConfig.KEY],
            }),
            AppCacheModule
          ],
  controllers: [AppController],
  providers: [
                AppService,
                {
                  provide: APP_GUARD,
                  useClass: AuthorizeGuard,
                },
                {
                  provide: APP_GUARD,
                  useClass: RolesGuard
                }
              ],
})
export class AppModule {}
