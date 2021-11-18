import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Public = () => SetMetadata("isPublic", true);

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
