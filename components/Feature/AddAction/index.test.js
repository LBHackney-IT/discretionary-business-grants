import { render } from '@testing-library/react';
import AddAction from './index';
import { enableFetchMocks } from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

describe('AddAction', () => {
  it('renders the add action form', () => {
    const { getByLabelText } = render(<AddAction />);

    expect(getByLabelText('Summary')).toBeInTheDocument();
    expect(getByLabelText('Full description(optional)')).toBeInTheDocument();
    expect(getByLabelText('Day')).toBeInTheDocument();
    expect(getByLabelText('Month')).toBeInTheDocument();
    expect(getByLabelText('Year')).toBeInTheDocument();
  });
});

describe('OnClick', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('Adds an action', async () => {
    enableFetchMocks();
    const expectedRequest = {
      body: JSON.stringify({
        summary: 'summary',
        description: 'description',
        dueDate: { day: 1, month: 1, year: 1991 }
      })
    };
    const expectedResponse = { id: '1', firstName: 'James', lastName: 'Bond' };
    fetch.mockResponse(JSON.stringify(expectedResponse));
    const { getByTestId } = render(<AddAction updatePlan={jest.fn()} id="1" />);
    await userEvent.type(getByTestId('summary-text'), 'summary');
    await userEvent.type(getByTestId('full-description'), 'description');
    await userEvent.type(getByTestId('due-date-day'), '01');
    await userEvent.type(getByTestId('due-date-month'), '01');
    await userEvent.type(getByTestId('due-date-year'), '1991');
    await getByTestId('add-action-button-test').click();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plans/1/action'),
      expect.objectContaining(expectedRequest)
    );
  });
});
