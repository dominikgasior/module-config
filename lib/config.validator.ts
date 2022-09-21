import { Injectable } from '@nestjs/common';

import {
  ObjectValidatorResultFactory,
  ObjectValidatorResult
} from '@finlink/common/validation';

import { validateSync } from 'class-validator';

import { ValidationError } from 'class-validator/types/validation/ValidationError';

import { Config } from './config-provider';


@Injectable()
export class ConfigValidator {
  static validate(config: Config): void {
    const result: ValidationError[] = validateSync(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (result.length > 0) {
      const objectValidatorResult: ObjectValidatorResult =
        ObjectValidatorResultFactory.create(result);
      throw new Error(
        `Configuration validation failed for '${config.constructor.name}'. ${ConfigValidator.formatErrorMessage(objectValidatorResult)}`
      );
    }
  }

  private static formatErrorMessage(
    objectValidatorResult: ObjectValidatorResult
  ): string {
    return JSON.stringify(objectValidatorResult, null, 2);
  }
}
