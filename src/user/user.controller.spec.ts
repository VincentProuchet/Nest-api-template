import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserGetDto } from './dto/uset-get.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should return an array of UserGetDto', async () => {
      const result: UserGetDto[] = [{
        id: 1,
        email: 'foo@bar.com'
      }];
      jest.spyOn(userService, 'getAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe<UserGetDto[]>(result);
    });
    it('should return an empty array', async () => {
      const result: UserGetDto[] = [];
      jest.spyOn(userService, 'getAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe<UserGetDto[]>(result);
    });
  });

  describe('getById', () => {
    it('should return the UserGetDto with specified id', async () => {
      const result: UserGetDto = {
        id: 1,
        email: 'foo@bar.com'
      };
      jest.spyOn(userService, 'getById').mockImplementation(async () => result);
      expect(await userController.findById(1)).toBe<UserGetDto>(result);
    });
    it('should return null if not found', async () => {
      const result: UserGetDto | null = null;
      jest.spyOn(userService, 'getById').mockImplementation(async () => result);
      expect(await userController.findById(1)).toBe<null>(result);
    });
  });

  describe('getByEmail', () => {
    it('should return the UserGetDto with specified email', async () => {
      const result: UserGetDto = {
        id: 1,
        email: 'foo@bar.com'
      };
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => result);
      expect(await userController.findByEmail('foo@bar.com')).toBe<UserGetDto>(result);
    });
    it('should return null if not found', async () => {
      const result: UserGetDto | null = null;
      jest.spyOn(userService, 'getById').mockImplementation(async () => result);
      expect(await userController.findByEmail('foo@bar.com')).toBe<null>(result);
    });
  });
});
