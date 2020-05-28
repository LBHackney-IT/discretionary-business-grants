import ActionsList from 'components/ActionsList';
import { render } from '@testing-library/react';

describe('<ActionsList />', () => {
  const component = (
    <ActionsList
      actions={[
        {
          title: 'Run a test',
          description: 'This will check if it works',
          dueDate: '2020-05-26T09:00:00+0000'
        }
      ]}
    />
  );

  it('displays the title of the action', () => {
    const { getByText } = render(component);
    expect(getByText('Run a test')).toBeInTheDocument();
  });

  it('displays the due date of the action', () => {
    const { getAllByText } = render(component);
    expect(getAllByText('26 May 2020')[0]).toBeInTheDocument();
  });
});
