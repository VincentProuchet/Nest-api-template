import { Injectable } from '@nestjs/common';

const users: any[] = [
  {
    'id': 1,
    'username': "Alain Dupont",
    'email': "dupont.alain@test.fr"
  },
  {
    'id': 2,
    'username': "Stéphane Durant",
    'email': "durant.stephane@test.fr"
  },
  {
    'id': 3,
    'username': "Marie Test",
    'email': "durant.stephane@test.fr"
  }
]

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
}
