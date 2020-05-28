import { Goal, Action, ArgumentError } from '../../../lib/domain';

describe('Goal', () => {
  describe('addAction', () => {
    it('adds an action to the actions array', () => {
      const goal = new Goal({ targetReviewDate: '', actions: [] });
      const dueDate = {
        day: 1,
        month: 5,
        year: 2019
      };

      const action = new Action({ summary: 'just a test', dueDate });
      goal.addAction(action);
      expect(goal.actions).toStrictEqual(expect.arrayContaining([action]));
    });

    it('throws an argument error when trying to add a non-action object', () => {
      const goal = new Goal({ targetReviewDate: '', actions: [] });
      const action = {};
      expect(() => goal.addAction(action)).toThrow(ArgumentError);
    });
  });

  it('sets the agreed date to todays date', () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const goal = new Goal({
      targetReviewDate: {
        day: 12,
        month: 2,
        year: 2030
      }
    });

    expect(goal.agreedDate).toEqual(today.toISOString());
  });

  it('does not set the review date if previously set', () => {
    const agreedDate = '2030-02-12T00:00:00.000Z';
    const targetReviewDate = '2040-02-12T00:00:00.000Z';
    const goal = new Goal({ agreedDate, targetReviewDate });

    expect(goal.agreedDate).toEqual('2030-02-12T00:00:00.000Z');
  });

  it('sets the target review date', () => {
    const targetReviewDate = {
      day: 12,
      month: 2,
      year: 2030
    };

    const goal = new Goal({ targetReviewDate });

    expect(goal.targetReviewDate).toEqual('2030-02-12T00:00:00.000Z');
  });

  it('does not set the target review date if previously set', () => {
    const targetReviewDate = '2030-02-12T00:00:00.000Z';
    const goal = new Goal({ targetReviewDate });

    expect(goal.targetReviewDate).toEqual('2030-02-12T00:00:00.000Z');
  });
});
