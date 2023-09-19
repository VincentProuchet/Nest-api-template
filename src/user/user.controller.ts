import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserGetDto } from './dto/user-get.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StringEmailDto } from '../common/dto/string-email.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({
        description: 'A list of all users',
        type: [UserGetDto],
    })
    @Get('all')
    async findAll(): Promise<UserGetDto[]> {
        return await this.userService.getAll();
    }

    @ApiResponse({
        description: 'The user with specified id',
        type: UserGetDto,
    })
    @Get('/byId/:id')
    async findById(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<UserGetDto | null> {
        return await this.userService.getById(userId);
    }

    @ApiResponse({
        description: 'The user with specified email',
        type: UserGetDto,
    })
    @HttpCode(HttpStatus.OK)
    @Post('/byEmail')
    async findByEmail(
        @Body() stringEmailDto: StringEmailDto,
    ): Promise<UserGetDto | null> {
        return await this.userService.getByEmail(stringEmailDto.email);
    }

    @ApiResponse({
        description: 'The updated user ',
        type: UserGetDto,
    })
    @HttpCode(HttpStatus.ACCEPTED)
    @Put('/update')
    async update(
        @Body() user: UserUpdateDto,
    ): Promise<UserUpdateDto | HttpException | Error> {
        if (user == null) {
            throw new BadRequestException('body est vide');
        }
        return await this.userService.update(user);
    }
}
