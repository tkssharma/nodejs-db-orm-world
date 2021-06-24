import { HttpException, HttpStatus, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { Repository } from 'typeorm';
import User from '../entities/User';
import Post from 'src/entities/Post';
import { PostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  // created new post 
  async create(postDTO: PostDTO): Promise<Post> {
    try {
    const { title, description } = postDTO;
    const newPost = new Post();
    newPost.title = title;
    newPost.text = description;
    return await this.postRepo.save(newPost);
    }catch(err){
      throw new BadRequestException(err);
    }
  }
}
