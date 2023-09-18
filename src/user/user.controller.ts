import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { EmailValidationPipe } from '../common/pipe/email-validation.pipe';
import { UserService } from './user.service';
import { UserGetDto } from './dto/user-get.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    description: "A list of all users",
    type: [UserGetDto]
  })
  @Get('all')
  async findAll(): Promise<UserGetDto[]> {
    return await this.userService.getAll();
  }

  @ApiResponse({
    description: "The user with specified id or null",
    type: UserGetDto
  })
  @Get('/byId/:id')
  async findById(@Param('id', ParseIntPipe) userId: number): Promise<UserGetDto | null> {
    return await this.userService.getById(userId);
  }

  @ApiResponse({
    description: "The user with specified email or null",
    type: UserGetDto
  })
  @HttpCode(HttpStatus.OK)
  @Post('/byEmail')
  async findByEmail(
    @Body('email', EmailValidationPipe) userEmail: string,
  ): Promise<UserGetDto | null> {
    return await this.userService.getByEmail(userEmail);
  }
}
