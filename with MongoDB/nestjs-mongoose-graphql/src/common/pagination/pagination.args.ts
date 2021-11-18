import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  page?: number;

  @Field(() => Int)
  pageSize?: number;
}
