import { IsNotEmpty, IsString } from "class-validator";

export class CreateSystemDto {

  @IsString()
  @IsNotEmpty()
  title: string

}
