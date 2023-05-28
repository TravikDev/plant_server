import { Category } from "src/categories/entities/category.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn({ name: 'userId' })
  userId: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Category, category => category.user, { onDelete: "CASCADE" })
  categories: Category[]
  
  @OneToMany(() => Transaction, transaction => transaction.user, { onDelete: "CASCADE" })
  transactions: Transaction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
