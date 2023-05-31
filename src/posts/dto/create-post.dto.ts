import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Culture } from "src/cultures/entities/culture.entity";
import { System } from "src/systems/entities/system.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";

export class CreatePostDto {
  
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  culture: Culture

  @IsOptional()
  veriety: Veriety

  @IsOptional()
  system: System
}
