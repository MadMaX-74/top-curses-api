import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { IdValidationConstance } from './id-validation.constance';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
	if (metadata.type !== 'param') {
		return value;
	}
	if (!Types.ObjectId.isValid(value)) {
		throw new BadRequestException(IdValidationConstance.ID_VALIDATION_ERROR);
	}
	return value;
  }
}
