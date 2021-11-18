import { Test, TestingModule } from "@nestjs/testing";
import { AuthResolver } from "./auth.resolver";
import { MongooseTestModule } from "../common/mongoose-testing.module";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth.module";
import { NotFoundException } from "@nestjs/common";

const EMAIL = "ramzi@gmail.com";
const PASSWORD = "ramzi";

describe("AuthResolver", () => {
  let resolver: AuthResolver;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [
        AuthModule,
        UsersModule,
        MongooseTestModule(),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    userService = module.get(UsersService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  it("should return a valid token", async () => {
    const user = await userService.create({
      confirmPassword: PASSWORD,
      password: PASSWORD,
      email: EMAIL,
      username: "ramzi",
    });
    const { success, token } = await resolver.login({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(success).toBeTruthy();
    expect(token).toBeTruthy();
    await userService.delete({ _id: user.id });
  });
  it("should throw exception when not logged in", async () => {
    await expect(async () => {
      await resolver.login({
        email: EMAIL,
        password: PASSWORD,
      });
    }).rejects.toThrow(NotFoundException);
  });
});
