import { fireEvent, render } from '@testing-library/react';
import DateInput from './index';

describe('DateInput', () => {
  const inputName = 'my-date';

  it('renders the day input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const dayInput = getByLabelText(/\s*Day\s*/);

    expect(dayInput).toBeInTheDocument();
    expect(dayInput.id).toEqual(`${inputName}-day`);
    expect(dayInput.name).toEqual(`${inputName}-day`);
  });

  it('renders the month input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const monthInput = getByLabelText(/\s*Month\s*/);

    expect(monthInput).toBeInTheDocument();
    expect(monthInput.id).toEqual(`${inputName}-month`);
    expect(monthInput.name).toEqual(`${inputName}-month`);
  });

  it('renders the year input', () => {
    const { getByLabelText } = render(<DateInput name={inputName} />);
    const yearInput = getByLabelText(/\s*Year\s*/);

    expect(yearInput).toBeInTheDocument();
    expect(yearInput.id).toEqual(`${inputName}-year`);
    expect(yearInput.name).toEqual(`${inputName}-year`);
  });

  it('renders a title', () => {
    const inputTitle = 'My Date';
    const { getByText } = render(
      <DateInput name={inputName} title={inputTitle} />
    );
    const title = getByText(inputTitle);

    expect(title).toBeInTheDocument();
  });

  it('renders a hint if showHint is true', () => {
    const { container } = render(
      <DateInput name={inputName} showHint={true} />
    );
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).toBeInTheDocument();
  });

  it('does not render a hint if showHint is falsy', () => {
    const { container } = render(<DateInput name={inputName} />);
    const hint = container.querySelector(`#${inputName}-hint`);

    expect(hint).not.toBeInTheDocument();
  });

  it('performs an action onChange', () => {
    let day = -1;
    let month = -1;
    let year = -1;
    const myAction = jest.fn(e => {
      if (e.target.name.includes('day')) day = e.target.value;
      if (e.target.name.includes('month')) month = e.target.value;
      if (e.target.name.includes('year')) year = e.target.value;
    });
    const { getByLabelText } = render(
      <DateInput name={inputName} onChange={myAction} />
    );

    fireEvent.change(getByLabelText(/\s*Day\s*/), {
      target: { value: 12 }
    });
    fireEvent.change(getByLabelText(/\s*Month\s*/), {
      target: { value: 10 }
    });
    fireEvent.change(getByLabelText(/\s*Year\s*/), {
      target: { value: 2021 }
    });

    expect(day).toEqual('12');
    expect(month).toEqual('10');
    expect(year).toEqual('2021');
  });
});
