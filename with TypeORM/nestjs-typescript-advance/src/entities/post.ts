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
import Tag from './Tag';
import Category from './Category';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public title: string;

  @ManyToOne(() => User, user => user.posts, {eager : true, onDelete: 'CASCADE'})
  public user: User;

  @OneToMany(() => Comment, comment => comment.post)
  public comments: Comment[];

  @OneToMany(() => Tag, tag => tag.post)
  public tags: Tag[];

  @OneToOne(() => Category, category => category.post)
  public category: Category;

  @Column()
  public url: string;

  @Column()
  public text: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}

export default Post;
