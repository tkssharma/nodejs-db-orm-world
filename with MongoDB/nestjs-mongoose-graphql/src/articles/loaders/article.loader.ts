import { Injectable, Scope } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { UsersService } from "../../users/users.service";
import * as DataLoader from "dataloader";
import { User } from "../../users/users.schema";
import { Mapper } from "../../common/mapper";
import { Comment } from "../schemas/comment.schema";
import { ArticlesService } from "../services/articles.service";
import { FavoriteService } from "../services/favorite.service";

type ArticleFavoritedLoader = { articleId: ObjectId; user: User };

@Injectable({ scope: Scope.REQUEST })
export class ArticleLoader {
  authorsMapper = new Mapper<User>();

  constructor(
    private readonly userService: UsersService,
    private readonly articleService: ArticlesService,
    private readonly favoriteService: FavoriteService,
  ) {}

  public readonly batchAuthors = new DataLoader<ObjectId, User>(
    async (authorIds: ObjectId[]) => {
      const authors = await this.userService.findByIds(authorIds);
      return this.authorsMapper.mapObjectsToId(authors, authorIds);
    },
  );

  public readonly batchCommentAuthors = new DataLoader<ObjectId, User>(
    async (commentAuthorIds: ObjectId[]) => {
      const authors = await this.userService.findByIds(commentAuthorIds);
      return this.authorsMapper.mapObjectsToId(authors, commentAuthorIds);
    },
  );

  public readonly batchComments = new DataLoader<ObjectId, Comment[]>(
    async (articledIds: ObjectId[]) => {
      return this.articleService.getCommentsForArticles(articledIds);
    },
  );

  public readonly batchFavorited = new DataLoader<
    ArticleFavoritedLoader,
    boolean
  >(async (favoritesByUser: ArticleFavoritedLoader[]) => {
    const user = favoritesByUser[0].user;
    return this.favoriteService.isArticlesFavoriteByUser(
      user,
      favoritesByUser.map((f) => f.articleId),
    );
  });
}
