// upload/upload.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../config/cloudinary.config';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from '../auth/provider/cloudinary.provider';


@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [
    {
      provide: 'CLOUDINARY',    // injection token
      useFactory: (config: ConfigType<typeof cloudinaryConfig>) => {
        cloudinary.config({
          cloud_name: config.cloudName,
          api_key: config.apiKey,
          api_secret: config.apiSecret,
        });
        return cloudinary;
      },
      inject: [cloudinaryConfig.KEY],
    },
    CloudinaryProvider,
  ],
  exports: [CloudinaryProvider],  // so UsersModule can use it
})
export class UploadModule {}