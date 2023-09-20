import { UserGetDto } from '../dto/user-get.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static async entityToDtoGet(
    entity: UserEntity | null,
  ): Promise<UserGetDto | null> {
    if (!entity) return null;

    const dto: UserGetDto = {
      ...entity,
    };
    return dto;
  }

  static async entityToDtoLogin(
    entity: UserEntity | null,
  ): Promise<UserLoginDto | null> {
    if (!entity) return null;

    const dto: UserLoginDto = {
      hashedPassword: entity.password,
    };
    return dto;
  }
}
