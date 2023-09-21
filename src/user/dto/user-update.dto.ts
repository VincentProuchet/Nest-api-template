import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class UserUpdateDto {
  @IsPositive()
  id: number;

  @IsEmail()
  email: string;

  /** prénom */
  @IsNotEmpty()
  firstname: string;

  /** nom */
  @IsNotEmpty()
  lastname: string;
}
