import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isEmail(value))
      throw new BadRequestException('Validation failed (valid email format is expected)');

    return value;
  }
}
