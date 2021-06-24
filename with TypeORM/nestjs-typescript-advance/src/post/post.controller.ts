import { Body, Controller, Post, Get, BadRequestException, Param } from '@nestjs/common';

import { PostService } from './post.service';
import { PostDTO } from './post.dto';

@Controller('post')
export class AuthController {
  constructor(
    private postService: PostService,
  ) {}

  @Get('/:id')
  async getPost(@Param('id') id: string) {
      try {
          return await this.postService.getPostByid(id);
      } catch(err){
         throw new BadRequestException(err);
      }
  }
  @Post('/')
  async login(@Body() postDTO: PostDTO) {
      try {
          return await this.postService.create(postDTO);
      } catch(err){
         throw new BadRequestException(err);
      }
  }
}
