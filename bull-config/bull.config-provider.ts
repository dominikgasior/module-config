import { ConfigProvider } from '@finlink/server/common/config';
import { BullConfig } from './bull.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullConfigProvider extends ConfigProvider<BullConfig> {
  async provide(): Promise<BullConfig> {
    return new BullConfig({
      redisHost: process.env.REDIS_HOST,
      redisPort: +process.env.REDIS_PORT,
      redisDb: +process.env.REDIS_DB,
    });
  }
}
