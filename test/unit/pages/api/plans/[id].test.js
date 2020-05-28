import { endpoint } from 'pages/api/plans/[id]';
import { ArgumentError } from 'lib/domain';

describe('Get Plan Api', () => {
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
    url: 'localdev/api/plans/1'
  };

  it('can get a plan', async () => {
    const expectedResponse = expect.objectContaining({
      id: 1,
      firstName: 'Nick',
      lastName: 'Dove'
    });

    const getPlan = {
      execute: jest.fn(x => {
        return expectedResponse;
      })
  }

    await endpoint({ getPlan })(req, res);

    expect(getPlan.execute).toHaveBeenCalledWith({ id: '1' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles bad requests', async () => {
    const expectedResponse = { error: 'could not get plan' };

    const getPlan = {
      execute: jest.fn()
    };
    getPlan.execute.mockImplementation(() => {
      throw new ArgumentError('something is missing');
    });

    await endpoint({ getPlan })(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });

  it('handles general errors', async () => {
    const expectedResponse = { error: 'could not get plan with id=1' };

    const getPlan = {
      execute: jest.fn()
    };
    getPlan.execute.mockImplementation(() => {
      throw new Error('bang!');
    });

    await endpoint({ getPlan })(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expectedResponse);
  });
});
