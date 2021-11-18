import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
import { HideField } from "@nestjs/graphql";
import { BaseSchema } from "../common/base.schema";

@Schema({ timestamps: true })
@ObjectType()
export class User extends BaseSchema {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @HideField()
  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: null })
  bio?: string;

  @Prop({ required: false, default: null })
  image?: string;

  @Prop({ default: false })
  isActive: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
