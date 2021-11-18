import { IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  body: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  articleId: ObjectId;
}
