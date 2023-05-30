import { Culture } from "src/cultures/entities/culture.entity";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Veriety {

  @PrimaryGeneratedColumn({ name: 'verietyId' })
  verietyId: number

  @Column()
  title: string

  @ManyToMany(() => User, { nullable: true })
  @JoinTable({ name: 'verieties_of_user' })
  users: User[]

  @ManyToOne(() => Culture, culture => culture.verieties, { nullable: true })
  culture: Culture

  @OneToMany(() => Post, post => post.veriety, { nullable: true })
  posts: Post[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

}
