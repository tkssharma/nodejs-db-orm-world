import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Success {
  success: boolean;
}
