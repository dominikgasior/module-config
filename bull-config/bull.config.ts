import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Config } from '@finlink/server/common/config';

export class BullConfig implements Config {
  @IsNotEmpty()
  @IsString()
  redisHost: string;

  @IsNotEmpty()
  @IsNumber()
  redisPort: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(15)
  redisDb: number;

  constructor(args: BullConfig) {
    Object.assign(this, args);
  }
}
