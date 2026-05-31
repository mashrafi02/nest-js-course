import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryProvider } from '../auth/provider/cloudinary.provider';


@Injectable()
export class ProfileService {
    
    
    constructor(
        @InjectRepository(Profile) 
        private readonly profileRepository : Repository<Profile>,
    
        private readonly cloudinaryProvider: CloudinaryProvider,    
    ){}

    getAllProfiles(){
        return this.profileRepository.find({
            relations:{
                user: true
            }
        })
    }

    // profile/profile.service.ts
    async updateAvatar(id: number, file: Express.Multer.File) {
        const user = await this.profileRepository.findOneBy({ id });

        // delete old avatar from cloudinary if exists
        if (user.avatarPublicId) {
            await this.cloudinaryProvider.deleteImage(user.avatarPublicId);
        }

        const result = await this.cloudinaryProvider.uploadImage(file, 'avatars');

        await this.profileRepository.update(id, {
            avatarUrl: result.secure_url,
            avatarPublicId: result.public_id,
        });

        return { avatarUrl: result.secure_url };
    }
}
