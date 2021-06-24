import { Controller, Get, UseFilters, UseGuards, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping')
  @UseGuards(AuthGuard('jwt'))
  getHelloPing(): string {
    return this.appService.getHello();
  }
}
