import GetPlan from '../../../lib/use-cases/get-plan';
import Plan from '../../../lib/domain/plan';

describe('Get Plan Use Case', () => {
  const logger = { info: jest.fn(), error: jest.fn() };

  it('gets a plan with id', async () => {
    const id = 1;
    const planGateway = {
      get: jest.fn(
        () => new Plan({ id, firstName: 'Simon', lastName: 'ThePieman' })
      )
    };

    const getPlan = new GetPlan({ planGateway, logger });
    const result = await getPlan.execute({ id });

    expect(planGateway.get).toHaveBeenCalledWith({ id });
    expect(result).toEqual({ id, firstName: 'Simon', lastName: 'ThePieman' });
  });

  it('returns null if plan does not exist', async () => {
    const planGateway = {
      get: jest.fn(() => null)
    };

    const getPlan = new GetPlan({ planGateway, logger });
    const result = await getPlan.execute({ id: 1 });
    expect(result).toEqual(null);
  });
});
