import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
