import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/uset-get.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './repositories/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserGetDto[]> {
    const entities: UserEntity[] = await this.usersRepository.find();
    let results: UserGetDto[] = [];

    entities.forEach(async (userEntity: UserEntity) => {
        results.push(await UserMapper.entityToDtoGet(userEntity) as UserGetDto);
    });

    return results;
  }

  async getById(userId: number): Promise<UserGetDto | null> {
    return await UserMapper.entityToDtoGet(await this.usersRepository.findOneBy({id: userId}));
  }

  async getByEmail(userEmail: string): Promise<UserGetDto | null> {
    return await UserMapper.entityToDtoGet(await this.usersRepository.findOneBy({email: userEmail}));
  }

  async create(userInfo: RegisterDto): Promise<UserGetDto> {
    const newUser: UserEntity = this.usersRepository.create(userInfo);
    await this.usersRepository.save(newUser);
    return await UserMapper.entityToDtoGet(newUser) as UserGetDto;
  }
}
