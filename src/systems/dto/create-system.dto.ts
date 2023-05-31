import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Culture } from "src/cultures/entities/culture.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";
// import { User } from "src/users/entities/user.entity";

export class CreateSystemDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  cultures: Culture[]

  @IsOptional()
  verieties: Veriety[]

}
