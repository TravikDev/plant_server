import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn({ name: "transactionId" })
  transactionId: number

  @Column()
  title: string

  @Column()
  type: string

  @Column()
  amount: number

  @ManyToOne(() => Category, category => category.transactions)
  @JoinColumn({ name: "categoryId"})
  category: Category

  @ManyToOne(() => User, user => user.transactions)
  @JoinColumn({ name: "userId" })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
