import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Article } from "../schemas/article.schema";
import { Model, ObjectId } from "mongoose";
import { User } from "../../users/users.schema";
import { ArticlesService } from "./articles.service";

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly articlesService: ArticlesService,
  ) {}
  async addArticleToFavorite(articleId: ObjectId, user: User) {
    const article = await this.articleModel.findOne({ _id: articleId });
    if (!article) {
      throw new NotFoundException("not found");
    }
    article.favoritedUsers.push(user);
    await article.save();
    return true;
  }

  async deleteArticleFromFavorite(articleId: ObjectId, user: User) {
    await this.articleModel
      .updateOne(
        {
          _id: articleId,
        },
        {
          $pull: { favoritedUsers: user._id },
        },
      )
      .exec();
    return true;
  }

  async isArticlesFavoriteByUser(
    user: User,
    articleIds: ObjectId[],
  ): Promise<boolean[]> {
    const articles = await this.articlesService.findByIds(articleIds);
    return articles.map((article) =>
      !article.favoritedUsers
        ? false
        : !!article.favoritedUsers.find(
            (u) => u._id.toString() === user._id.toString(),
          ),
    );
  }
}
