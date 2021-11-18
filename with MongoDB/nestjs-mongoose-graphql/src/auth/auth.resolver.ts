import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JWTTokenResponseType, LoginInputType } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CurrentUser, Public } from "./decorators";
import { User } from "../users/users.schema";

@Resolver(() => JWTTokenResponseType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JWTTokenResponseType, {
    description: "login using email/password to obtain a JWT token",
  })
  @Public()
  async login(
    @Args("input") { email, password }: LoginInputType,
  ): Promise<JWTTokenResponseType> {
    return this.authService.loginUser(email, password);
  }

  @Query(() => User, { description: "returns current logged in user" })
  async currentUser(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
