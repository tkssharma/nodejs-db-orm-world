import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { ArticleIdInput } from "../dto/article/article-id.input";
import { FavoriteService } from "../services/favorite.service";
import { CurrentUser } from "../../auth/decorators";
import { User } from "../../users/users.schema";
import { Success } from "../dto/success.type";
import { Article } from "../schemas/article.schema";
import { ArticleLoader } from "../loaders/article.loader";

@Resolver(() => Article)
export class FavoriteResolver {
  constructor(
    private readonly favoriteService: FavoriteService,
    private articleLoader: ArticleLoader,
  ) {}

  @Mutation(() => Success, { description: "favorite an article" })
  async favoriteArticle(
    @CurrentUser() currentUser: User,
    @Args("input") favoriteArticleInput: ArticleIdInput,
  ) {
    const response = await this.favoriteService.addArticleToFavorite(
      favoriteArticleInput.articleId,
      currentUser,
    );
    return { success: response };
  }

  @Mutation(() => Success, { description: "unFavorite an article" })
  async unFavoriteArticle(
    @CurrentUser() currentUser: User,
    @Args("input") favoriteArticleInput: ArticleIdInput,
  ) {
    const response = await this.favoriteService.deleteArticleFromFavorite(
      favoriteArticleInput.articleId,
      currentUser,
    );
    return { success: response };
  }

  @ResolveField(() => Number)
  favoritesCount(@Parent() article: Article): number {
    return article.favoritedUsers?.length ?? 0;
  }

  @ResolveField(() => Boolean)
  favorited(@Parent() article: Article, @CurrentUser() user): Promise<boolean> {
    return this.articleLoader.batchFavorited.load({
      user: user,
      articleId: article._id,
    });
  }
}
