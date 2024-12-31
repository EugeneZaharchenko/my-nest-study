import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PhoneAuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const phoneNumber = String(value.phone);
    const regex = /^\d{10,11}$/;

    if (!regex.test(phoneNumber)) {
      throw new BadRequestException(
        'Phone number must be exactly 10 or 11 digits',
      );
    }
    return value;
  }
}
