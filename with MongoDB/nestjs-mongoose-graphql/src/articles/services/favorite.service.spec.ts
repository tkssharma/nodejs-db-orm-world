import { UsersService } from "../../users/users.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../../users/users.module";
import {
  closeMongoConnection,
  MongooseTestModule,
} from "../../common/mongoose-testing.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "../../users/users.schema";
import { Article } from "../schemas/article.schema";
import { ArticlesModule } from "../articles.module";
import { ArticlesService } from "./articles.service";
import { FavoriteService } from "./favorite.service";

describe("FavoriteService", () => {
  let userService: UsersService;
  let user: User;
  let article: Article;
  let articleService: ArticlesService;
  let favoriteService: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [
        UsersModule,
        MongooseTestModule(),
        ArticlesModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    userService = module.get(UsersService);
    articleService = module.get(ArticlesService);
    favoriteService = module.get(FavoriteService);

    user = await userService.create({
      confirmPassword: "1234",
      password: "1234",
      email: "test@email.com",
      username: "test",
    });
    article = await articleService.createWithUser(
      {
        body: "test body",
        description: "Test desc",
        slug: "test-article",
        title: "hello",
        tags: ["asdasd", "ASdas"],
      },
      user,
    );
  });

  afterEach(async () => {
    await articleService.delete({ _id: article._id });
    await userService.delete({ _id: user._id });
  });

  afterAll(async () => {
    await closeMongoConnection();
  });

  it("should favorite an article", async () => {
    const res = await favoriteService.addArticleToFavorite(article._id, user);
    expect(res).toBeTruthy();
    const updatedArticle = await articleService.findOne({ _id: article._id });
    expect(updatedArticle.favoritedUsers[0]._id).toEqual(user._id);
  });

  it("should be able to delete a favorite article", async () => {
    await favoriteService.addArticleToFavorite(article._id, user);
    const res = await favoriteService.deleteArticleFromFavorite(
      article._id,
      user,
    );
    expect(res).toBeTruthy();
    const updatedArticle = await articleService.findOne({ _id: article._id });
    expect(updatedArticle.favoritedUsers.length).toEqual(0);
  });

  it("should return if article favorite for a group of articles", async () => {
    await favoriteService.addArticleToFavorite(article._id, user);
    const favorited = await favoriteService.isArticlesFavoriteByUser(user, [
      article._id,
    ]);
    expect(Array.isArray(favorited)).toBeTruthy();
  });
});
