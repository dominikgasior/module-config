import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { ConfigProvider } from './config-provider';
import { ValidatedConfigProvider } from './validated-config-provider';
import { getConfigToken } from './inject-config.decorator';
import { getConfigProviderToken } from './inject-config-provider.decorator';

export type ConfigOptions = Pick<ModuleMetadata, 'imports'>;

@Module({})
export class ServerCommonConfigModule {
  static registerConfigProvider(
    configProviderType: Type<ConfigProvider>,
    options?: ConfigOptions
  ): DynamicModule {
    const config: Provider = {
      provide: getConfigToken(configProviderType),
      inject: [configProviderType],
      useFactory: async (provider: ConfigProvider) => {
        const validatedConfigProvider: ValidatedConfigProvider =
          new ValidatedConfigProvider(provider);

        return validatedConfigProvider.provide();
      }
    };

    const configProvider: Provider = {
      provide: getConfigProviderToken(configProviderType),
      inject: [configProviderType],
      useFactory: (provider: ConfigProvider) =>
        new ValidatedConfigProvider(provider),
    };

    return {
      module: ServerCommonConfigModule,
      imports: [...(options?.imports || [])],
      providers: [configProviderType, config, configProvider],
      exports: [config, configProvider],
    };
  }
}
