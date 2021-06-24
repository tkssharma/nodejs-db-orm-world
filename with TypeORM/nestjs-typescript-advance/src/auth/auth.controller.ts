import { Body, Controller, Post, Get } from '@nestjs/common';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    return { 'message': 'user creatd successfully' };
  }
}
