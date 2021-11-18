import { Module } from "@nestjs/common";
import { ArticlesService } from "./services/articles.service";
import { ArticlesResolver } from "./resolvers/articles.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { ArticleLoader } from "./loaders/article.loader";
import { UsersModule } from "../users/users.module";
import { FavoriteService } from "./services/favorite.service";
import { FavoriteResolver } from "./resolvers/favorite.resolver";
import { CommentService } from "./services/comment.service";
import { CommentResolver } from "./resolvers/comment.resolver";
import { CommentSchema, Comment } from "./schemas/comment.schema";
import { CommonModule } from "../common/common.module";

@Module({
  providers: [
    ArticlesResolver,
    ArticlesService,
    ArticleLoader,
    FavoriteService,
    FavoriteResolver,
    CommentService,
    CommentResolver,
  ],
  imports: [
    CommonModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
})
export class ArticlesModule {}
