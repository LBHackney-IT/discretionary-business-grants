const TextInput = ({ label, name, register, ...otherProps }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={name}>
      {label}
    </label>
    <input
      className="govuk-input"
      id={name}
      data-testid={name}
      name={name}
      type="text"
      ref={register}
      {...otherProps}
    />
  </div>
);

export default TextInput;
