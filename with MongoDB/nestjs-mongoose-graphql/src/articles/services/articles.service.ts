import { Inject, Injectable } from "@nestjs/common";
import { CreateArticleInput } from "../dto/article/create-article.input";
import { UpdateArticleInput } from "../dto/article/update-article.input";
import { CrudService } from "../../common/services/crud.service";
import { Article, ArticleDocument } from "../schemas/article.schema";
import { User } from "../../users/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Comment } from "../schemas/comment.schema";
import { PUB_SUB } from "../../common/constants";
import { PubSub } from "graphql-subscriptions";
import { ARTICLE_ADDED_EVENT } from "../subscription-constants";

@Injectable()
export class ArticlesService extends CrudService<
  Article,
  CreateArticleInput,
  UpdateArticleInput
> {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {
    super(articleModel);
  }

  async createWithUser(
    createDto: CreateArticleInput,
    user: User,
    userRef = "author",
  ): Promise<Article> {
    const newArticle = await super.createWithUser(createDto, user, userRef);
    await this.pubSub.publish(ARTICLE_ADDED_EVENT, {
      articleAdded: newArticle,
    });
    return newArticle;
  }

  async getCommentsForArticles(articleIds: ObjectId[]): Promise<Comment[][]> {
    const articlesWithComments = await this.articleModel
      .find({
        _id: { $in: articleIds },
      })
      .populate("comments")
      .select("comments")
      .exec();
    return articlesWithComments.map((article) => article.comments);
  }
}
