import { render } from '@testing-library/react';
import TextArea from './index';

describe('TextArea', () => {
  it('renders a text area', () => {
    const inputName = 'input-name';
    const inputLabel = 'Label';
    const { getByLabelText } = render(
      <TextArea name={inputName} label={inputLabel} />
    );

    const labelRegex = new RegExp(`\s*${inputLabel}\s*`);
    const input = getByLabelText(labelRegex);

    expect(input).toBeInTheDocument();
    expect(input.id).toEqual(inputName);
    expect(input.name).toEqual(inputName);
  });
});
