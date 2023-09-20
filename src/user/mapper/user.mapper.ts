import { UserGetDto } from '../dto/user-get.dto';
import { UserAuthDto } from '../dto/user-auth.dto';
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

  static async entityToDtoAuth(
    entity: UserEntity | null,
  ): Promise<UserAuthDto | null> {
    if (!entity) return null;

    const dto: UserAuthDto = {
      ...entity,
    };
    return dto;
  }
}
