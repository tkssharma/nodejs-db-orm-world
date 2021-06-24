import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Comment from './Comment';
import User from './User';
import Post from './Post';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public category: string;
 
  @OneToOne(() => Post, post => post.category)
  public post: Post;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}

export default Category;
