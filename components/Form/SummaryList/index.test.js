import { render } from '@testing-library/react';
import SummaryList from './index';

describe('SummaryList', () => {
  it('renders a summary list', () => {
    const listName = 'my-list';
    const listObject = {
      Name: 'Jake Jones',
      'Target review date': '12/12/2020'
    };
    const { container, getByText } = render(
      <SummaryList name={listName} listObject={listObject} />
    );

    const list = container.querySelector(`#${listName}`);

    expect(list).toBeInTheDocument();
    expect(list.children.length).toEqual(Object.keys(listObject).length);
    for (let [key, value] of Object.entries(listObject)) {
      expect(getByText(key)).toBeInTheDocument();
      expect(getByText(value)).toBeInTheDocument();
    }
  });
});
