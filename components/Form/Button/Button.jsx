import cx from 'classnames';

const Button = ({ onClick, text, type, isSecondary, ...otherProps }) => (
  <div className="govuk-form-group">
    <button
      className={cx('govuk-button', { 'govuk-button--secondary': isSecondary })}
      data-module="govuk-button"
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {text}
    </button>
  </div>
);

export default Button;
