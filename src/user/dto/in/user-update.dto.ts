import { IsEmail, IsPositive } from 'class-validator';

export class UserUpdateDto {
  @IsPositive()
  id: number;

  @IsEmail()
  email: string;

  /** prénom */
  firstname?: string;

  /** nom */
  lastname?: string;
}
