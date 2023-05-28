import { Transaction } from "src/transactions/entities/transaction.entity"
import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Category {
  
  @PrimaryGeneratedColumn({ name: "categoryId" })
  categoryId: number

  @Column()
  title: string

  @ManyToOne(() => User, user => user.categories)
  @JoinColumn({ name: 'userId '})
  user: User
  
  @OneToMany(() => Transaction, transaction => transaction.category)
  @JoinColumn({ name: 'transactionId' })
  transactions: Transaction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
