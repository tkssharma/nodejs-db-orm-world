import { ObjectId } from "mongoose";
import { HideField, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export class BaseSchema {
  readonly id?: string;

  @HideField()
  readonly _id?: ObjectId;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
