import { Action } from '../../../lib/domain';

describe('Action', () => {
  it('sets the correct due date', () => {
    const dueDate = {
      day: 1,
      month: 2,
      year: 2019
    };

    const expectedDate = new Date(2019, 1, 1).toISOString();
    const action = new Action({ dueDate });

    expect(action.dueDate).toEqual(expectedDate);
  });

  it('creates an Action object', () => {
    const expectedAction = {
      summary: 'summary',
      description: 'description',
      dueDate: new Date(2020, 1, 23).toISOString()
    };

    const action = new Action({
      summary: 'summary',
      description: 'description',
      dueDate: { year: 2020, month: 2, day: 23 }
    });

    expect(action).toEqual(expectedAction);
  });
});
