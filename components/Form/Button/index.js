const Button = ({ onClick, text, ...others }) => (
  <div className="govuk-form-group">
    <button
      className="govuk-button"
      data-module="govuk-button"
      onClick={onClick}
      {...others}
    >
      {text}
    </button>
  </div>
);

export default Button;
