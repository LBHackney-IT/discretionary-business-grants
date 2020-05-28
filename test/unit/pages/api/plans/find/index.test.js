import { endpoint } from '../../../../../../pages/api/plans/find';
import { ArgumentError } from '../../../../../../lib/domain';

describe('Find Plans Api', () => {
  const firstName = 'James';
  const lastName = 'Bond';
  const systemIds = [{ JigsawId: '15' }];

  let json;
  let res;

  beforeEach(() => {
    json = jest.fn();
    res = {
      status: jest.fn(() => {
        return { json };
      })
    };
  });

  const req = {
    method: 'GET',
    body: {
      firstName,
      lastName,
      systemIds
    }
  };

  it('can find a plan', async () => {
    const id = '1';
    const expectedResponse = expect.objectContaining({ planIds: [id] });

    const findPlans = {
        execute: jest.fn(() => expectedResponse)
      };

    await endpoint({ findPlans })(req, res);

    expect(findPlans.execute).toHaveBeenCalledWith({
      firstName,
      lastName,
      systemIds
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not find plans' };

    const findPlans = {
      execute: jest.fn()
    };
    findPlans.execute.mockImplementation(() => {
      throw new ArgumentError('something is missing');
    });

    await endpoint({ findPlans })(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = {
      error: 'could not find plans with firstName=James, lastName=Bond'
    };

    const findPlans = {
      execute: jest.fn()
    };
    findPlans.execute.mockImplementation(() => {
      throw new Error('bang!');
    });

    await endpoint({ findPlans })(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
