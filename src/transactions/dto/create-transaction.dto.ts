import { IsNotEmpty } from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  type: "income" | "outcome"

  @IsNotEmpty()
  amount: number

  // @IsNotEmpty()
  // user: User

  @IsNotEmpty()
  category: Category

}
