import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthResolver } from "./auth.resolver";
import { JwtAuthGuard } from "./auth.guard";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, AuthResolver, JwtAuthGuard],
})
export class AuthModule {}
