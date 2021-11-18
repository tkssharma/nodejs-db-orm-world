import { InputType, OmitType } from "@nestjs/graphql";
import { Article } from "../../schemas/article.schema";

@InputType()
export class CreateArticleInput extends OmitType(
  Article,
  [
    "id",
    "author",
    "createdAt",
    "updatedAt",
    "favoritedUsers",
    "comments",
    "favorited",
    "favoritesCount",
  ],
  InputType,
) {}
