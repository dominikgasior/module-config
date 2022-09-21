import { Module } from '@nestjs/common';
import { ServerCommonConfigModule } from '@finlink/server/common/config';
import { BullConfigProvider } from './bull.config-provider';

@Module({
  imports: [
    ServerCommonConfigModule.registerConfigProvider(BullConfigProvider),
  ],
  exports: [ServerCommonConfigModule],
})
export class BullConfigModule {}
