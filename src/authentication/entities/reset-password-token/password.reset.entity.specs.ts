import { PasswordResetEntity } from "./password.reset.entity";

describe('ResetPasswordToken', () => {
  it('should be defined', () => {
    expect(new PasswordResetEntity()).toBeDefined();
  });
});
