import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ["password", "confirmPassword"]),
  InputType,
) {}
