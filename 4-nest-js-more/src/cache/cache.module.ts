// cache/cache.module.ts
import { Module } from '@nestjs/common';
import { CacheProvider } from '../auth/provider/cache.provider';


@Module({
  providers: [CacheProvider],
  exports: [CacheProvider],
})
export class AppCacheModule {}