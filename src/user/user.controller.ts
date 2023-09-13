import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { EmailValidationPipe } from '../common/pipe/email-validation.pipe';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAll(): Promise<any[]> {
    return await this.userService.getAll();
  }

  @Get('/byId/:id')
  async findById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.userService.getById(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/byEmail')
  async findByEmail(@Body('email', EmailValidationPipe) userEmail: string): Promise<any> {
    return await this.userService.getByEmail(userEmail);
  }
}
