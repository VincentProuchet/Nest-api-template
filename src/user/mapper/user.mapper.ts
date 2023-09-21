import { UserGetDto } from '../dto/user-get.dto';

import { UserUpdateDto } from '../dto/user-update.dto';
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

	static async entityToDtoUpdate(
		entity: UserEntity | null,
	): Promise<UserUpdateDto | Error> {
		if (!entity) {
			throw new Error("erreur de converison de l'entité, entité vide ");
		}
		const dto: UserUpdateDto = {
			id: entity.id,
			email: entity.email,
			firstname: entity.firstname,
			lastname: entity.lastname,
		};
		return dto;
	}
}
