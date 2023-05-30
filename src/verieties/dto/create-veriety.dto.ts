import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Culture } from "src/cultures/entities/culture.entity";

export class CreateVerietyDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  culture: Culture



}
