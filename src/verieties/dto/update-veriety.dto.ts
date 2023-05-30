import { PartialType } from '@nestjs/mapped-types';
import { CreateVerietyDto } from './create-veriety.dto';

export class UpdateVerietyDto extends PartialType(CreateVerietyDto) {}
