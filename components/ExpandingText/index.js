import React, { useState } from 'react';

const ExpandingText = ({ expandButtonText, contractButtonText, children }) => {
  const [isExpanded, setExpanded] = useState(false);

  if (isExpanded) {
    return (
      <>
        {children}
        <button
          className="lbh-link-button lbh-link-button__up"
          data-testid="text-contract-button"
          onClick={() => setExpanded(false)}
        >
          {contractButtonText}
        </button>
      </>
    );
  }

  return (
    <button
      className="lbh-link-button lbh-link-button__down"
      data-testid="text-expand-button"
      onClick={() => setExpanded(true)}
    >
      {expandButtonText}
    </button>
  );
};

export default ExpandingText;
