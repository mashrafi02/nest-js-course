import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { In, Repository } from 'typeorm';
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

    public async findHashtagByIds(ids: number[]): Promise<Hashtag[]> {
        const hashtags = await this.hashtagRepository.find({
            where:{
                id: In(ids || [])
            }
        });
        return hashtags;
    }

    public async deleteHashtagById(id: number): Promise<void> {
        await this.hashtagRepository.delete({ id });
    }

    public async softDeleteHashtagById(id: number): Promise<void> {
        await this.hashtagRepository.softDelete({ id });
    }
}
