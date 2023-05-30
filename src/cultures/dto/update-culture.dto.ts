import { PartialType } from '@nestjs/mapped-types';
import { CreateCultureDto } from './create-culture.dto';

export class UpdateCultureDto extends PartialType(CreateCultureDto) {}
