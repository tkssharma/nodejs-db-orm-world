import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import UserEntity from './entities/User';
import PostEntity from './entities/Post';
import CommnentEntity from './entities/Comment';

import TagEntity from './entities/Tag';
import CategoryEntity from './entities/Category';

import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule.forRoot({ entities: [
      PostEntity,
      UserEntity,
      CommnentEntity,
      CategoryEntity,
      TagEntity
    ]}),
    AuthModule,
    SharedModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {

}
