import { Culture } from "src/cultures/entities/culture.entity";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class System {

  @PrimaryGeneratedColumn({ name: 'systemId' })
  systemId: number

  @Column()
  title: string

  @ManyToOne(() => User, user => user.systems, { nullable: true })
  user: User

  @ManyToMany(() => Culture, culture => culture.system, { nullable: true })
  @JoinTable({ name: 'cultures_of_system' })
  cultures: Culture[]

  @ManyToMany(() => Veriety, { nullable: true })
  @JoinTable({ name: 'verieties_of_system' })
  verieties: Veriety[]

  @OneToMany(() => Post, post => post.system, { nullable: true })
  posts: Post[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date


}
