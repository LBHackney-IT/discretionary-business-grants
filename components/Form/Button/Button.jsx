const Button = ({ onClick, text, type, ...otherProps }) => (
  <div className="govuk-form-group">
    <button
      className="govuk-button"
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
