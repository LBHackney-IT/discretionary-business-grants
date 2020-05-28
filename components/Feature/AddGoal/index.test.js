import { fireEvent, render } from '@testing-library/react';
import AddGoal from './index';

describe('AddGoal', () => {
  it('renders the add goal form', () => {
    const { getByLabelText, getByText } = render(<AddGoal />);
    expect(getByLabelText('Goal')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
    expect(getByLabelText('Use as a PHP')).toBeInTheDocument();
    expect(getByText('Add actions')).toBeInTheDocument();
  });

  it('saves the goal when add actions button is clicked', () => {
    const addGoalUseCase = {
      execute: jest.fn()
    };
    const planId = 1;
    const { getByLabelText, getByText } = render(
      <AddGoal addGoalUseCase={addGoalUseCase} planId={planId} />
    );

    fireEvent.change(getByLabelText('Goal'), {
      target: { value: 'this is my goal' }
    });
    fireEvent.change(getByLabelText('Day'), {
      target: { value: '12' }
    });
    fireEvent.change(getByLabelText('Month'), {
      target: { value: '10' }
    });
    fireEvent.change(getByLabelText('Year'), {
      target: { value: '2021' }
    });

    fireEvent(
      getByText('Add actions'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(addGoalUseCase.execute).toHaveBeenCalledWith({
      planId,
      goal: {
        targetReviewDate: {
          day: 12,
          month: 10,
          year: 2021
        },
        text: 'this is my goal',
        useAsPhp: false
      }
    });
  });
});
