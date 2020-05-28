import ExpandingText from 'components/ExpandingText';
import { render } from '@testing-library/react';

describe('<ExpandingText />', () => {
  const expectedContent = 'Hello world';
  const component = (
    <ExpandingText expandButtonText="More" contractButtonText="Less">
      {expectedContent}
    </ExpandingText>
  );

  describe('when not expanded', () => {
    it('shows the expand button', () => {
      const { getByText } = render(component);
      expect(getByText('More')).toBeInTheDocument();
    });

    it('does not show the content', () => {
      const { queryByText } = render(component);
      expect(queryByText(expectedContent)).not.toBeInTheDocument();
    });
  });

  describe('clicking expand', () => {
    const buttons = {
      expand: 'text-expand-button',
      contract: 'text-contract-button'
    }

    it('shows the content', () => {
      const { getByText, getByTestId } = render(component);
      getByTestId(buttons.expand).click();
      expect(getByText(expectedContent)).toBeInTheDocument();
    });

    it('hides the content again after contracting', () => {
      const { queryByText, getByTestId } = render(component);

      getByTestId(buttons.expand).click();
      expect(queryByText(expectedContent)).toBeInTheDocument();

      getByTestId(buttons.contract).click();
      expect(queryByText(expectedContent)).not.toBeInTheDocument();
    });
  });
});
