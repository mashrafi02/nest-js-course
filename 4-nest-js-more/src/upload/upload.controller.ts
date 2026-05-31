// upload/upload.controller.ts
import {
  Controller, Post, UseInterceptors,
  UploadedFile, ParseFilePipe,
  MaxFileSizeValidator, FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryProvider } from '../auth/provider/cloudinary.provider';


@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryProvider: CloudinaryProvider) {}

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),   // keep in RAM, don't touch disk
    }),
  )
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),  // 2MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinaryProvider.uploadImage(file, 'avatars');

    return {
      url: result.secure_url,      // permanent HTTPS URL
      publicId: result.public_id,  // needed if you want to delete later
    };
  }
}