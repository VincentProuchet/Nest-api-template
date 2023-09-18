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
import { ApiBearerAuth, ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StringEmailDto } from '../common/dto/string-email.dto';

@ApiBearerAuth()
@ApiTags('user')
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
    description: "The user with specified id",
    type: UserGetDto
  })
  @Get('/byId/:id')
  async findById(@Param('id', ParseIntPipe) userId: number): Promise<UserGetDto | null> {
    return await this.userService.getById(userId);
  }

  @ApiResponse({
    description: "The user with specified email",
    type: UserGetDto
  })
  @HttpCode(HttpStatus.OK)
  @Post('/byEmail')
  async findByEmail(
    @Body() stringEmailDto: StringEmailDto,
  ): Promise<UserGetDto | null> {
    return await this.userService.getByEmail(stringEmailDto.email);
  }
}
