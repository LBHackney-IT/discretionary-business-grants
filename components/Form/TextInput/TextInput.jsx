const TextInput = ({ label, name, register, type = 'text', ...otherProps }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={name}>
      {label}
    </label>
    <input
      className="govuk-input"
      id={name}
      data-testid={name}
      name={name}
      type={type}
      ref={register}
      {...otherProps}
    />
  </div>
);

export default TextInput;
