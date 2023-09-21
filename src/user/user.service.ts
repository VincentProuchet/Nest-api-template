import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/user-get.dto';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserUpdateDto } from './dto/user-update.dto';

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

  /**
   * Met à jours les informations
   * d'un instance UserEntity
   * contrôle l'intégrité des données
   * @param userInfo
   * @returns
   */
  async update(userInfo: UserUpdateDto): Promise<UserGetDto> {
    // on fait directement une recherche avec les deux données importantes
    // qui  ne peuvent être changée en même temps que le reste
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      id: userInfo.id,
      email: userInfo.email,
    });
    if (user) {
      user.firstname = userInfo.firstname;
      user.lastname = userInfo.lastname;

      await this.usersRepository.save(user);

      return (await UserMapper.entityToDtoGet(user)) as UserGetDto;
    } else {
      throw new BadRequestException('user to modify not found');
    }
  }

  async getHashedPwdFromEmail(userEmail: string): Promise<UserAuthDto | null> {
    return await UserMapper.entityToDtoAuth(
      await this.usersRepository.findOneBy({ email: userEmail }),
    );
  }
}
