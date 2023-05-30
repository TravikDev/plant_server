import { Culture } from "src/cultures/entities/culture.entity";
import { System } from "src/systems/entities/system.entity";
import { User } from "src/users/entities/user.entity";
import { Veriety } from "src/verieties/entities/veriety.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {

  @PrimaryGeneratedColumn({ name: 'postId' })
  postId: number

  @Column()
  title: string

  @ManyToOne(() => User, user => user.posts, { nullable: true })
  user: User

  @ManyToOne(() => System, system => system.posts, { nullable: true } )
  system: System

  @ManyToOne(() => Culture, culture => culture.posts, { nullable: true })
  culture: Culture

  @ManyToOne(() => Veriety, veriety => veriety.posts, { nullable: true })
  veriety: Veriety

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
