import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
    it('should be defined', () => {
        expect(new AuthenticationGuard()).toBeDefined();
    });
    const test: AuthenticationGuard | null = null;
    it('should be defined', () => {
        expect(test).toBeDefined();
    });
});
