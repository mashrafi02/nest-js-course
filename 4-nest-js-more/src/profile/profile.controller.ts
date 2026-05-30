import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SkipThrottle } from '@nestjs/throttler';
import { AllowAnonymous } from '../auth/decorators/allow-annonymous.decorator';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService : ProfileService) {}

    @Get()
    @SkipThrottle({ short: true, long: true })
    @AllowAnonymous()
    getProfiles() {
        return this.profileService.getAllProfiles()
    }
    
}
