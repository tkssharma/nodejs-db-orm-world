import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ValidatePasswordPipe } from "./pipes/validate-password.pipe";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./users.schema";
import { CurrentUser, Public } from "../auth/decorators";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User, { description: "create a new user" })
  @Public()
  async createUser(
    @Args("input", new ValidatePasswordPipe())
    createUserInputType: CreateUserInput,
  ) {
    return this.userService.create(createUserInputType);
  }

  @Mutation(() => User, { description: "update an existing user" })
  async updateUser(
    @Args("input")
    updateUserInputType: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.userService.update(currentUser._id, updateUserInputType);
  }
}
