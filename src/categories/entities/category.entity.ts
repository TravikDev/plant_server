import { Transaction } from "src/transactions/entities/transaction.entity"
import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Category {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(() => User, user => user)
  user: User
  
  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions: Transaction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
