import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    const re = /^[a-zA-Z\d]{1,30}[-.]{0,1}[a-zA-Z\d]{1,30}@[a-zA-Z\d]{1,30}-{0,1}[a-zA-Z\d]{1,30}.[a-z0-9]{2,6}$/;
    if (!re.test(value))
      throw new BadRequestException('Validation failed (valid email format is expected)');

    return value;
  }
}
