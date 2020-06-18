import PropTypes from 'prop-types';
import cx from 'classnames';

const ErrorMessage = ({ text, className }) => (
  <span className={cx('govuk-error-message', className)}>
    <span className="govuk-visually-hidden">Error:</span> {text}
  </span>
);

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ErrorMessage;
