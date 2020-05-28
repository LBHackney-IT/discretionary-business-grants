import AddGoal from '../../../lib/use-cases/add-goal';
import Plan from '../../../lib/domain/plan';
import Goal from '../../../lib/domain/goal';

describe('Add Goal Use Case', () => {

  const planGateway = {
    get: jest.fn(({ id }) => new Plan({ id })),
    save: jest.fn(({ plan }) => plan)
  };

  it('adds a goal to plan with id', async () => {
    const planId = 1;
    const text = 'the goal text';
    const targetReviewDate = {
      day: 12,
      month: 2,
      year: 2030
    };
    const useAsPhp = true;
    const addGoal = new AddGoal({ planGateway });

    const result = await addGoal.execute({
      planId,
      goal: { targetReviewDate, text, useAsPhp }
    });

    expect(planGateway.get).toHaveBeenCalledWith({ id: planId });
    expect(planGateway.save).toHaveBeenCalledWith({
      plan: expect.any(Plan)
    });
    expect(result.id).toEqual(planId);
    expect(result.goal.toString()).toEqual(
      new Goal({ targetReviewDate, text, useAsPhp }).toString()
    );
  });

  it('throws if plan does not exist', async () => {
    const planGateway = {
      get: jest.fn(() => null)
    };

    const addGoal = new AddGoal({ planGateway });
    //const result = await addGoal.execute({ planId: '1' });
    //expect(result).toThrowError(new Error('no plan found.'));
    await expect(async () => {
      await addGoal.execute({ planId: '1' });
    }).rejects.toThrow('no plan found.');
  });
});
