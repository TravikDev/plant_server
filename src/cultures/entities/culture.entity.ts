import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Culture {

  @PrimaryGeneratedColumn({ name: 'cultureId' })
  cultureId: number

  @Column()
  title: string

  @ManyToMany(() => User, { nullable: true })
  @JoinTable({ name: 'cultures_of_user' })
  users: User[]

  @OneToMany(() => Post, post => post.culture, { nullable: true })
  posts: Post[]

  @OneToMany(() => Veriety, veriety => veriety.culture, { nullable: true })
  verieties: Veriety[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
