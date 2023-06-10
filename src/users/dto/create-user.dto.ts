import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  
  @MinLength(4, { message: 'Username must be more then 4 symbols' })
  @MaxLength(16, { message: 'Username must be less then 16 symbols' })
  username: string

  @MinLength(6, { message: 'Username must be more then 6 symbols' })
  @MaxLength(16, { message: 'Username must be less then 16 symbols' })
  password: string

  refreshToken?: string

  // @IsNotEmpty()
  // @IsNumber()
  // role: number
}
