import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class System {

  @PrimaryGeneratedColumn({ name: 'systemId' })
  systemId: number

  @Column()
  title: string

  @ManyToOne(() => User, user => user.systems)
  user: User

  @OneToMany(() => Post, post => post.system, { nullable: true })
  posts: Post[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date


}
