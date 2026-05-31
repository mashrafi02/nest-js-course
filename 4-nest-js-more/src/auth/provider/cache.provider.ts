
import { Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

type PatternKeyStore = {
  keys(pattern?: string): Promise<string[]>;
};

@Injectable()
export class CacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async deleteByPattern(pattern: string): Promise<void> {
    // delete multiple keys matching a pattern e.g. 'users:*'
    const keyStore = this.cacheManager.stores.at(0)?.store as PatternKeyStore | undefined;

    if (!keyStore?.keys) {
      return;
    }

    const keys = await keyStore.keys(pattern);
    await Promise.all(keys.map(key => this.cacheManager.del(key)));
  }
}