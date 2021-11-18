import { BaseSchema } from "../../common/base.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
import { User } from "../../users/users.schema";
import * as mongoose from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Comment extends BaseSchema {
  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  author: User;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
