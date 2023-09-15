import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { RegisterDto } from '../authentication/dto/register.dto';
import { UserGetDto } from './dto/uset-get.dto';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should return an array of UserGetDto', async () => {
      expect(await userService.getAll()).toBe<UserGetDto[]>(userService.users);
    });
  });

  describe('getById', () => {
    it('should return the UserGetDto with specified id', async () => {
      expect(await userService.getById(1)).toBe<UserGetDto>(userService.users.find((el) => el.id === 1) as UserGetDto);
    });
    it('should return undefined if not found', async () => {
      expect(await userService.getById(-1)).toBe(undefined);
    });
  });

  describe('getByEmail', () => {
    it('should return the UserGetDto with specified email', async () => {
      expect(await userService.getByEmail('foo1@bar.fr')).toBe<UserGetDto>(userService.users.find((el) => el.email === 'foo1@bar.fr') as UserGetDto);
    });
    it('should return undefined if not found', async () => {
      expect(await userService.getByEmail('foo@bar.com')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created UserGetDto', async () => {
      const registerDto: RegisterDto = {
        email: 'foo@bar.org',
        password: 'foobar'
      }
      expect(await userService.create(registerDto)).toBe<UserGetDto>(userService.users.find((el) => el.email === 'foo@bar.org') as UserGetDto);
    });
  });
});
