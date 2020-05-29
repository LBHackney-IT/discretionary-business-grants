import { fireEvent, render } from '@testing-library/react';
import Checkbox from './index';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    const checkboxName = 'my-checkbox';
    const checkboxLabel = 'My Checkbox';
    const { getByLabelText } = render(
      <Checkbox name={checkboxName} label={checkboxLabel} />
    );

    const checkbox = getByLabelText(checkboxLabel);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toEqual(checkboxName);
    expect(checkbox.name).toEqual(checkboxName);
  });

  it('performs an action onClick', () => {
    const myAction = jest.fn();
    const checkboxLabel = 'My Checkbox';
    const { getByLabelText } = render(
      <Checkbox name={'my-checkbox'} label={checkboxLabel} onClick={myAction} />
    );

    fireEvent(
      getByLabelText(checkboxLabel),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myAction).toHaveBeenCalled();
  });
});
