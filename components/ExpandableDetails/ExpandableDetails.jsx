import PropTypes from 'prop-types';

const ExpandableDetails = ({ summary = 'show more', children }) => (
  <details
    className="govuk-details  govuk-!-margin-bottom-3"
    data-module="govuk-details"
  >
    <summary className="govuk-details__summary">
      <span className="govuk-details__summary-text">{summary}</span>
    </summary>
    <div className="govuk-details__text">{children}</div>
  </details>
);

ExpandableDetails.propTypes = {
  summary: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ExpandableDetails;
