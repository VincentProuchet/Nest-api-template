import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/user-get.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './repositories/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/user.mapper';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDataIntegrityException } from './Exceptions/UserDataIntegrityException';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async getAll(): Promise<UserGetDto[]> {
        const entities: UserEntity[] = await this.usersRepository.find();
        const results: UserGetDto[] = [];

        entities.forEach(async (userEntity: UserEntity) => {
            results.push(
                (await UserMapper.entityToDtoGet(userEntity)) as UserGetDto,
            );
        });

        return results;
    }

    async getById(userId: number): Promise<UserGetDto | null> {
        return await UserMapper.entityToDtoGet(
            await this.usersRepository.findOneBy({ id: userId }),
        );
    }

    async getByEmail(userEmail: string): Promise<UserGetDto | null> {
        return await UserMapper.entityToDtoGet(
            await this.usersRepository.findOneBy({ email: userEmail }),
        );
    }

    async create(userInfo: RegisterDto): Promise<UserGetDto> {
        const newUser: UserEntity = this.usersRepository.create(userInfo);
        await this.usersRepository.save(newUser);
        return (await UserMapper.entityToDtoGet(newUser)) as UserGetDto;
    }
    /**
     * Met à jours les informations
     * d'un instance UserEntity
     * contrôle l'intégrité des données
     * @param userInfo
     * @returns
     */
    async update(userInfo: UserUpdateDto): Promise<UserGetDto> {
        const currentUser = (await this.usersRepository.findOneBy({
            id: userInfo.id,
        })) as UserEntity;
        if (currentUser.email.valueOf() != userInfo.email) {
            // @TODO répondre par une exception, l'email servant d'identifiant pour la connexion
            // il ne peux être changé
            // il est aussi possible que l'ont ait affaire à une usurpation d'identifiant
            throw new UserDataIntegrityException(
                'les emails des comptes ne peuvent pas être modifiés',
            );
        }

        // fin des contrôles
        // mise à jour des données
        currentUser.firstname = userInfo.firstname;
        currentUser.lastname = userInfo.lastname;

        await this.usersRepository.save(currentUser); // mise en base de données
        return (await UserMapper.entityToDtoGet(currentUser)) as UserGetDto;
    }
}
