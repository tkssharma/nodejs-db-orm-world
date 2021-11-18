import { Field, InputType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@InputType()
export class ArticleFilterInput {
  slug?: string;

  @Field(() => String)
  id?: ObjectId;
}
