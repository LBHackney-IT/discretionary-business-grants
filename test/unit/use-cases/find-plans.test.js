import FindPlans from '../../../lib/use-cases/find-plans';

describe('Find plans', () => {
  it('can find matching plans', async () => {
    const planGateway = { find: jest.fn() };
    const findPlans = new FindPlans({ planGateway });

    const findPlansRequest = {
      firstName: 'Joe',
      lastName: 'Bro',
      systemIds: ['123']
    };

    await findPlans.execute(findPlansRequest);
    expect(planGateway.find).toHaveBeenCalledWith(findPlansRequest);
  });
});
