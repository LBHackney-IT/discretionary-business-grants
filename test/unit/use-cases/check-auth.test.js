import CheckAuth from '../../../lib/use-cases/check-auth';

describe('Check Auth Use Case', () => {
  it('should verify a token', () => {
    const jwt = { verify: jest.fn(() => ({ groups: [] })) };
    const token = 'xyz';
    const secret = 'secret';
    process.env.JWT_SECRET = secret;
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    checkAuth.execute({ token });

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });

  it('should return true if a user is in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    const jwt = { verify: jest.fn(() => ({ groups: ['theGroup'] })) };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if a user in not in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    const jwt = { verify: jest.fn(() => ({ groups: ['otherGroup'] })) };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('a user can have more than one group', () => {
    const allowedGroups = ['firstGroup'];
    const jwt = {
      verify: jest.fn(() => ({ groups: ['firstGroup', 'secondGroup'] }))
    };
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if verified token is null', () => {
    const jwt = { verify: jest.fn(() => null) };
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('should return false if verified token does not contain groups', () => {
    const jwt = { verify: jest.fn(() => ({})) };
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('should return false if token verification fails', () => {
    const jwt = {
      verify: jest.fn(() => {
        throw new Error('NO!');
      })
    };
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'WRONG' });

    expect(result).toBe(false);
  });
});
