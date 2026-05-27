import { Module } from '@nestjs/common';
import { PaginationProvider } from './pagination.provider';
import { Scope } from '@nestjs/common';

@Module({
  providers: [{ provide: PaginationProvider, useClass: PaginationProvider, scope: Scope.REQUEST }],
  exports: [PaginationProvider]
})
export class PaginationModule {}
