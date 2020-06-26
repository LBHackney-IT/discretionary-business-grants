export const WarningText = ({ children }) => (
  <div className="govuk-warning-text">
    <span className="govuk-warning-text__icon" aria-hidden="true">
      !
    </span>
    <strong className="govuk-warning-text__text">
      <span className="govuk-warning-text__assistive">Warning</span>
      {children}
    </strong>
  </div>
);

export default WarningText;
