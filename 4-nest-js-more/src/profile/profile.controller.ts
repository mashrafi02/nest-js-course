import {
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SkipThrottle } from '@nestjs/throttler';
import { AllowAnonymous } from '../auth/decorators/allow-annonymous.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService : ProfileService) {}

    @Get()
    @SkipThrottle({ short: true, long: true })
    @AllowAnonymous()
    getProfiles() {
        return this.profileService.getAllProfiles()
    }
    

    @Post(':id/avatar')
    @AllowAnonymous()  // for testing, remove in production
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
                new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
            ],
        }),
    )
    file: Express.Multer.File,
    ) {
    return this.profileService.updateAvatar(id, file);
    }
}
