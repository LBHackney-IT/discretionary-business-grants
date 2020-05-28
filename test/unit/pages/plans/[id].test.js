import { enableFetchMocks } from 'jest-fetch-mock';
import PlanSummary from 'pages/plans/[id]';
import { render } from '@testing-library/react';

describe('PlanSummary', () => {
  it('renders correct title', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Test',
      goal: { text: 'hello' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Bob Test's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that end with "S"', () => {
    const plan = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Tes',
      goal: { text: 'hello' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Bob Tes' shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names that have special characters', () => {
    const plan = {
      id: '1',
      firstName: 'X Æ A-12',
      lastName: 'Musk',
      goal: { text: 'hello' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("X Æ A-12 Musk's shared plan")).toBeInTheDocument();
  });

  it('renders correct title for names with an empty string for last Name', () => {
    const plan = {
      id: '1',
      firstName: 'Dan',
      lastName: '',
      goal: { text: 'hello' }
    };
    const { getByText } = render(<PlanSummary initialPlan={plan} />);
    expect(getByText("Dan's shared plan")).toBeInTheDocument();
  });

  it('fetches plan from the correct url and constructs correct props', async () => {
    enableFetchMocks();
    const expectedResponse = {
      id: '1',
      firstName: 'James',
      lastName: 'Bond'
    };
    fetch.mockResponse(JSON.stringify(expectedResponse));
    const props = await PlanSummary.getInitialProps({ query: { id: '1' } });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/plans/1'));
    expect(props.initialPlan).toStrictEqual(expectedResponse);
  });
});
