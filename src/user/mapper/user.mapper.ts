import { UserGetDto } from "../dto/user-get.dto";
import { UserEntity } from "../repositories/user.entity";

export class UserMapper {
  static async entityToDtoGet(entity: UserEntity | null): Promise<UserGetDto | null> {
    if (!entity)
      return null;

    const dto : UserGetDto = ({
        ...entity
    });
    return dto;
  }
}
