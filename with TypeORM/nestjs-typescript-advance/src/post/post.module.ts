import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from '../entities/Post';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post])
    ],
  controllers: [],
  providers: [],
})
export class AppModule  {

}
