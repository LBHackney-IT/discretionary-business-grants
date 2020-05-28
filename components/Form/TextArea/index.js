const TextArea = ({ label, name, onChange }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={`${name}`}>
      {label}
    </label>
    <textarea
      className="govuk-textarea"
      id={name}
      name={name}
      data-testid={name}
      rows="5"
      onChange={onChange}
    ></textarea>
  </div>
);

export default TextArea;
