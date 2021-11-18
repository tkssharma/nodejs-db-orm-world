import { InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class LoginInputType {
  email: string;
  password: string;
}

@ObjectType()
export class JWTTokenResponseType {
  token?: string;
  success: boolean;
}
