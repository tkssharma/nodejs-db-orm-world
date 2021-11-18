import { ObjectId } from "mongoose";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteCommentInput {
  @Field(() => String)
  commentId: ObjectId;

  @Field(() => String)
  articleId: ObjectId;
}
