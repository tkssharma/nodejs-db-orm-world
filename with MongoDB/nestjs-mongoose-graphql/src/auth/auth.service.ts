import { forwardRef, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.schema";
import { JwtService } from "@nestjs/jwt";
import { GraphQLError } from "graphql";
import { JWTTokenResponseType } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    const isPasswordVerified = await this.verifyPassword(
      password,
      user.password,
    );
    if (isPasswordVerified) {
      return user;
    }
    return null;
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<JWTTokenResponseType> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new GraphQLError("User Credentials are wrong !");
    }
    try {
      const token = await this.jwtService.signAsync(
        {
          email: user.email,
          id: user.id,
          username: user.username,
        },
        {},
      );
      return { token, success: true };
    } catch (e) {
      return { token: null, success: false };
    }
  }
}
