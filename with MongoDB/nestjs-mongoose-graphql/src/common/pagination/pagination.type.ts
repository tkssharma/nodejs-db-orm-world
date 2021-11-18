import { Field, ObjectType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

@ObjectType()
class PaginationInfo {
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  nextPage: number;
  prevPage: number;
}

export class Pagination<T> extends PaginationInfo {
  results: T[];
}

// ugly hack to make generic works
export const Paginated = <T>(classRef: Type<T>): any => {
  @ObjectType()
  class PaginationType extends PaginationInfo {
    @Field(() => [classRef])
    results: T[];
  }

  return PaginationType;
};
