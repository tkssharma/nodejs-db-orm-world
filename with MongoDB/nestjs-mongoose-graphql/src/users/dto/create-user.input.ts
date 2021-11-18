import { Field, InputType, OmitType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { User } from "../users.schema";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ["isActive", "id", "createdAt", "updatedAt", "image"],
  InputType,
) {
  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @Field(() => GraphQLUpload)
  readonly image?: FileUpload;
}
