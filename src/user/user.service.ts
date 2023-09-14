import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/common/dto/authentication/register.dto';

const users: any[] = [
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

@Injectable()
export class UserService {
  async getAll(): Promise<any[]> {
    return users;
  }

  async getById(userId: number): Promise<any> {
    return users.find((el) => el.id === userId);
  }

  async getByEmail(userEmail: string): Promise<any> {
    return users.find((el) => el.email === userEmail);
  }

  async create(userInfo: RegisterDto): Promise<any> {
    const newUser = {
      ...{ id: users[users.length - 1].id + 1 },
      ...userInfo,
    };

    users.push(newUser);

    return newUser;
  }
}
