
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryProvider {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinaryClient: typeof cloudinary,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'avatars',
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
        {
          folder,                    // organizes files in cloudinary dashboard
          resource_type: 'image',
          transformation: [
            { width: 500, height: 500, crop: 'fill' },   // auto resize
            { quality: 'auto' },                          // auto optimize
          ],
        },
        (error, result) => {
          if (error) reject(new BadRequestException(error.message));
          else resolve(result);
        },
      );

      // pipe the buffer into cloudinary's upload stream
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await this.cloudinaryClient.uploader.destroy(publicId);
  }
}