import { PasswordTokenEntity } from "./Password.token.entity";

describe('ResetPasswordToken', () => {
  it('should be defined', () => {
    expect(new PasswordTokenEntity()).toBeDefined();
  });
});
