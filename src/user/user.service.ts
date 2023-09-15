import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/uset-get.dto';

@Injectable()
export class UserService {
  users: UserGetDto[] = [
    {
      id: 1,
      email: 'foo1@bar.fr',
      password: 'test123',
    },
    {
      id: 2,
      email: 'foo2@bar.com',
      password: 'test123',
    },
    {
      id: 3,
      email: 'foo3@bar.org',
      password: 'test123',
    },
  ];

  async getAll(): Promise<UserGetDto[]> {
    return this.users;
  }

  async getById(userId: number): Promise<UserGetDto | undefined> {
    return this.users.find((el) => el.id === userId);
  }

  async getByEmail(userEmail: string): Promise<UserGetDto | undefined> {
    return this.users.find((el) => el.email === userEmail);
  }

  async create(userInfo: RegisterDto): Promise<UserGetDto> {
    const newUser = {
      ...{ id: this.users[this.users.length - 1].id + 1 },
      ...userInfo,
    };

    this.users.push(newUser);

    return newUser;
  }
}
