import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Veriety } from "src/verieties/entities/veriety.entity";

export class CreateCultureDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  verieties: Veriety[]

}
