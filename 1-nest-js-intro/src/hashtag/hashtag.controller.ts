import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtah-dto';

@Controller('hashtag')
export class HashtagController {

    constructor(private readonly hashtagService: HashtagService) {}

    @Post()
    public createHashtag(@Body() tag: CreateHashtagDto) {
        return this.hashtagService.createHashtag(tag);
    }

    @Delete(':id')
    public deleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.deleteHashtagById(id);
    }

    @Delete('soft-delete/:id')
    public softDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.softDeleteHashtagById(id);
    }
}
