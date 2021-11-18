import { CreateArticleInput } from "./create-article.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID)
  id: ObjectId;
}
