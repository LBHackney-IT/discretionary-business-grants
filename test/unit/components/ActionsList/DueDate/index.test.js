import DueDate from 'components/ActionsList/DueDate';
import { render } from '@testing-library/react';

describe('<DueDate />', () => {
  it('displays an ISO-8601 formatted date human-readably', () => {
    const { getByText } = render(
      <DueDate dateTime={'2020-05-26T09:00:00+0000'} />
    );

    expect(getByText('26 May 2020')).toBeInTheDocument();
  });
});
