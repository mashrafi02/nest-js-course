import { Body, Controller, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtah-dto';

@Controller('hashtag')
export class HashtagController {

    constructor(private readonly hashtagService: HashtagService) {}

    @Post()
    public createHashtag(@Body() tag: CreateHashtagDto) {
        return this.hashtagService.createHashtag(tag);
    }
}
