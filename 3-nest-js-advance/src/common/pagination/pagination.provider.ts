import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Paginater } from './paginater.interface';

@Injectable()
export class PaginationProvider {

    constructor(
        @Inject(REQUEST) private readonly request: Request
    ){}

    public async paginatedQuery<T extends ObjectLiteral>(
        paginationQueryDto : PaginationQueryDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>,
        relations?: FindOptionsRelations<T>
    ): Promise<Paginater<T>> {

        const findOptions = {
            skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
            take: paginationQueryDto.limit
        }

        if(where){
            findOptions['where'] = where;
        }
        if(relations){
            findOptions['relations'] = relations;
        }
        const [result, totalItems] = await repository.findAndCount(findOptions);


        // page calculation
        const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
        const currentPage = paginationQueryDto.page;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;


        // building urls
        const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
        const newUrl = new URL(this.request.originalUrl, baseUrl);

        // console.log(newUrl);
        

        const reposponse: Paginater<T> = {
            data: result,
            meta: {
                itemsPerPage: paginationQueryDto.limit,
                totalItems,
                totalPages: Math.ceil(totalItems / paginationQueryDto.limit),
                currentPage: paginationQueryDto.page
            },
            links : {
                first: `${newUrl.origin}/${newUrl.pathname}?page=1&limit=${paginationQueryDto.limit}`,
                previous: `${newUrl.origin}/${newUrl.pathname}?page=${previousPage}&limit=${paginationQueryDto.limit}`,
                next: `${newUrl.origin}/${newUrl.pathname}?page=${nextPage}&limit=${paginationQueryDto.limit}`,
                last: `${newUrl.origin}/${newUrl.pathname}?page=${totalPages}&limit=${paginationQueryDto.limit}`,
                current: `${newUrl.origin}/${newUrl.pathname}?page=${currentPage}&limit=${paginationQueryDto.limit}`
            }
        };

        return reposponse
    }
}
