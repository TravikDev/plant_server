import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(() => Category, category => category)
  category: Category

  @ManyToOne(() => User, user => user)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
