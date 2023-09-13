import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class RegisterDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string | undefined;

  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
