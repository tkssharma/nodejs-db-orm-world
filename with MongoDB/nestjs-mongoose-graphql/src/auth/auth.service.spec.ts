import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { AuthModule } from "./auth.module";
import {
  closeMongoConnection,
  MongooseTestModule,
} from "../common/mongoose-testing.module";

let authService: AuthService;

const EMAIL = "Ramzi@test.com";
const PASSWORD = "password";

describe("AuthService", () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AuthModule, MongooseTestModule()],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    const userService = module.get<UsersService>(UsersService);
    await userService.create({
      username: "test",
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });
  });

  it("should return true if log in success", async () => {
    const isLogged = await authService.validateUser(EMAIL, PASSWORD);
    expect(isLogged).toBeTruthy();
  });

  it("should return false if log in failed", async () => {
    const isLogged = await authService.validateUser(EMAIL, "q343");
    expect(isLogged).toBeFalsy();
  });

  afterAll(() => closeMongoConnection());
});
