import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserGetDto {
  id: number;
  email: string;
  password: string;
}
