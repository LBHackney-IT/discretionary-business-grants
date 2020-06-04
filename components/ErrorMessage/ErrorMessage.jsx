const ErrorMessage = ({ children }) => (
  <span className="govuk-error-message">
    <span className="govuk-visually-hidden">Error:</span> {children}
  </span>
);

export default ErrorMessage;
