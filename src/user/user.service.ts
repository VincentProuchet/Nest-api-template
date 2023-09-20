import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/user-get.dto';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UserAuthDto } from './dto/user-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserGetDto[]> {
    const entities: UserEntity[] = await this.usersRepository.find();
    const results: UserGetDto[] = [];

    entities.forEach(async (userEntity: UserEntity) => {
      results.push((await UserMapper.entityToDtoGet(userEntity)) as UserGetDto);
    });

    return results;
  }

  async getById(userId: number): Promise<UserGetDto | null> {
    return await UserMapper.entityToDtoGet(
      await this.usersRepository.findOneBy({ id: userId }),
    );
  }

  async getByEmail(userEmail: string): Promise<UserGetDto | null> {
    return await UserMapper.entityToDtoGet(
      await this.usersRepository.findOneBy({ email: userEmail }),
    );
  }

  async create(userInfo: RegisterDto): Promise<UserGetDto> {
    const newUser: UserEntity = this.usersRepository.create(userInfo);
    await this.usersRepository.save(newUser);
    return (await UserMapper.entityToDtoGet(newUser)) as UserGetDto;
  }

  async getHashedPwdFromEmail(userEmail: string): Promise<UserAuthDto | null> {
    return await UserMapper.entityToDtoAuth(
      await this.usersRepository.findOneBy({ email: userEmail }),
    );
  }
}
