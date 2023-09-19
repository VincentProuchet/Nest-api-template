import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/user-get.dto';
import { UserEntity } from './repositories/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDataIntegrityException } from './Exceptions/UserDataIntegrityException';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async getAll(): Promise<UserGetDto[]> {
        const entities: UserEntity[] = await this.usersRepository.find();
        let results: UserGetDto[] = [];

        entities.forEach(async (userEntity: UserEntity) => {
            results.push(await UserMapper.entityToDtoGet(userEntity) as UserGetDto);
        });

        return results;
    }

    async getById(userId: number): Promise<UserGetDto | null> {
        return await UserMapper.entityToDtoGet(await this.usersRepository.findOneBy({ id: userId }));
    }

    async getByEmail(userEmail: string): Promise<UserGetDto | null> {
        return await UserMapper.entityToDtoGet(await this.usersRepository.findOneBy({ email: userEmail }));
    }

    async create(userInfo: RegisterDto): Promise<UserGetDto> {
        const newUser: UserEntity = this.usersRepository.create(userInfo);
        await this.usersRepository.save(newUser);
        return await UserMapper.entityToDtoGet(newUser) as UserGetDto;
    }
    /**
     * Met à jours les informations
     * d'un instance UserEntity
     * contrôle l'intégrité des données
     * @param userInfo
     * @returns
     */
    async update(userInfo: UserUpdateDto): Promise<UserUpdateDto | Error> {
        // on fait directement une recherche avec les deux données importantes
        // qui  ne peuvent être changée en même temps que le reste
        return await this.usersRepository
            .findOneBy({
                id: userInfo.id,
                email: userInfo.email,
            }) // entité récupérée
            .then((user: UserEntity) => {
                // mise à jour des données
                user.firstname = userInfo.firstname;
                user.lastname = userInfo.lastname;
                return this.usersRepository
                    .save(user) // mise en base de données
                    .then(
                        // sauvegarde réussié
                        (userInfo: UserEntity) => {
                            return UserMapper.entityToDtoUpdate(userInfo).then(
                                // après la conversion en DTO
                                (u) => {
                                    return u;
                                },
                            );
                        },
                    )
                    .catch(
                        // sauvegarde échoue
                        (reason: UserDataIntegrityException) => {
                            throw new HttpException(
                                reason.message,
                                HttpStatus.FORBIDDEN,
                            );
                        },
                    );
            }) // entité non trouvée
            .catch((reason: Error) => {
                throw new NotFoundException(' utilisateur non trouvé');
            });
    }
}
