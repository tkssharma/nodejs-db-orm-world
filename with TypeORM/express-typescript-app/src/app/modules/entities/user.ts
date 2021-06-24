import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import Comment from './Comment';
import Post from './Post';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public username!: string;

  @Column()
  @Length(4, 20)
  @IsEmail()
  public email!: string;

  @Column({ select: false })
  @Length(4, 100)
  @IsNotEmpty()
  public password!: string;

  @OneToMany(() => Post, post => post.user)
  public posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  public comments!: Comment[];

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
