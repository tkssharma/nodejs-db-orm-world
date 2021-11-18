import { Field, HideField, Int, ObjectType } from "@nestjs/graphql";
import { BaseSchema } from "../../common/base.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/users.schema";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment.schema";

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Article extends BaseSchema {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  body: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  author: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  })
  @HideField()
  readonly favoritedUsers: User[];

  @Field(() => Int)
  readonly favoritesCount: number;

  readonly favorited: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  })
  readonly comments: Comment[];
}

export type ArticleDocument = Article & Document;

export const ArticleSchema = SchemaFactory.createForClass(Article);
