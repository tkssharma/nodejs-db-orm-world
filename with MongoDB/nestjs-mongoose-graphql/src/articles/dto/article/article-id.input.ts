import { ObjectId } from "mongoose";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ArticleIdInput {
  @Field(() => String)
  articleId: ObjectId;
}
