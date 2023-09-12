import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { EmailValidationPipe } from './pipes/email-validation.pipe';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  async findAll(): Promise<any[]> {
    return await this.userService.getAll();
  }

  @Get('/byId/:id')
  async findById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.userService.getById(userId);
  }

  @Post('/byEmail')
  @HttpCode(200)
  async findByEmail(@Body('email', EmailValidationPipe) userEmail: string): Promise<any> {
    return await this.userService.getByEmail(userEmail);
  }
}
