import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Comment from './Comment';
import User from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  public title!: string;

  @Column()
  public url!: string;

  @Column()
  public text!: string;

  @ManyToOne(() => User, user => user.posts, { eager: true, onDelete: 'CASCADE' })
  public user!: User;

  @OneToMany(() => Comment, comment => comment.post)
  public comments!: Comment[];

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Post;
