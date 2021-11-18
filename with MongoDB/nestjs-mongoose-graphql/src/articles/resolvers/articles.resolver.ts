import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Subscription,
} from "@nestjs/graphql";
import { ArticlesService } from "../services/articles.service";
import { Article } from "../schemas/article.schema";
import { CreateArticleInput } from "../dto/article/create-article.input";
import { CurrentUser } from "../../auth/decorators";
import { User } from "../../users/users.schema";
import { PaginationArgs } from "../../common/pagination/pagination.args";
import { Pagination } from "../../common/pagination/pagination.type";
import { PaginatedArticle } from "../dto/article/article.type";
import { ArticleLoader } from "../loaders/article.loader";
import { UpdateArticleInput } from "../dto/article/update-article.input";
import { ArticleIdInput } from "../dto/article/article-id.input";
import { Success } from "../dto/success.type";
import { Comment } from "../schemas/comment.schema";
import { ArticleFilterInput } from "../dto/article/article-filter.input";
import { Inject } from "@nestjs/common";
import { PUB_SUB } from "../../common/constants";
import { PubSub } from "graphql-subscriptions";
import { ARTICLE_ADDED_EVENT } from "../subscription-constants";

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleLoader: ArticleLoader,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @ResolveField(() => User)
  async author(@Parent() article: Article): Promise<User> {
    return this.articleLoader.batchAuthors.load(article.author._id);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() article: Article): Promise<Comment[]> {
    return this.articleLoader.batchComments.load(article._id);
  }

  @Query(() => PaginatedArticle, { description: "get all articles" })
  async allArticles(
    @Args("pageInfo", { nullable: true }) pageInfo: PaginationArgs,
  ): Promise<Pagination<Article>> {
    return this.articlesService.findAll(
      {},
      null,
      {},
      pageInfo.page,
      pageInfo.pageSize,
    );
  }

  @Query(() => Article, { description: "get article by filter" })
  async getArticle(
    @Args("filter") articleGetInput: ArticleFilterInput,
  ): Promise<Article> {
    return this.articlesService.findOne({
      $or: [{ _id: articleGetInput.id }, { slug: articleGetInput.slug }],
    });
  }

  @Mutation(() => Article, { description: "create a new article" })
  async createArticle(
    @Args("input") createArticleInput: CreateArticleInput,
    @CurrentUser() currentUser: User,
  ): Promise<Article> {
    return await this.articlesService.createWithUser(
      createArticleInput,
      currentUser,
    );
  }

  @Mutation(() => Article, { description: "update an existing article" })
  async updateArticle(
    @Args("input") updateArticleInput: UpdateArticleInput,
  ): Promise<Article> {
    return await this.articlesService.update(
      updateArticleInput.id,
      updateArticleInput,
    );
  }

  @Mutation(() => Success, { description: "delete an existing article" })
  async deleteArticle(
    @Args("input") articleDeleteInput: ArticleIdInput,
  ): Promise<Success> {
    const res = await this.articlesService.delete({
      _id: articleDeleteInput.articleId,
    });
    return { success: res };
  }

  @Subscription(() => Article)
  async articleAdded() {
    return this.pubSub.asyncIterator(ARTICLE_ADDED_EVENT);
  }
}
