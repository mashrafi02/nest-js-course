import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtah-dto';

@Injectable()
export class HashtagService {

    constructor(
        @InjectRepository(Hashtag)
        private readonly hashtagRepository: Repository<Hashtag>
    ) {}

    public async createHashtag(tag: CreateHashtagDto) {
        const hashtag = this.hashtagRepository.create(tag);
        return await this.hashtagRepository.save(hashtag);
    }
}
