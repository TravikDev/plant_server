import { Category } from "src/categories/entities/category.entity";
import { Culture } from "src/cultures/entities/culture.entity";
import { Post } from "src/posts/entities/post.entity";
import { System } from "src/systems/entities/system.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn({ name: 'userId' })
  userId: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Category, category => category.user, { nullable: true })
  categories: Category[]
  
  @OneToMany(() => Transaction, transaction => transaction.user, { nullable: true })
  transactions: Transaction[]

  @ManyToMany(() => Culture, { nullable: true, onDelete: 'CASCADE', orphanedRowAction: "nullify" })
  @JoinTable({ name: 'cultures_of_user' })
  cultures: Culture[]

  @ManyToMany(() => Veriety, { nullable: true, onDelete: 'CASCADE', orphanedRowAction: "nullify" })
  @JoinTable({ name: 'verieties_of_user' })
  verieties: Veriety[]

  @OneToMany(() => System, system => system.user, { nullable: true, onDelete: "SET NULL" })
  systems: System[]

  @OneToMany(() => Post, post => post.user, { nullable: true, onDelete: "SET NULL" })
  posts: Post[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  refreshToken: string

  @Column()
  roles: number

}
