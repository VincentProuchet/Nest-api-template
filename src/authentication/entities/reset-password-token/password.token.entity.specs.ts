import { PasswordTokenEntity } from "./password.token.entity";

describe('ResetPasswordToken', () => {
  it('should be defined', () => {
    expect(new PasswordTokenEntity()).toBeDefined();
  });
});
