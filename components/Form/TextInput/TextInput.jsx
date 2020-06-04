const TextInput = ({
  label,
  hint,
  name,
  register,
  type = 'text',
  ...otherProps
}) => (
  <div className="govuk-form-group">
    <label className="govuk-label govuk-label--m" htmlFor={name}>
      {label}
    </label>
    {hint && (
      <span id={`${name}-hint`} class="govuk-hint">
        {hint}
      </span>
    )}
    <input
      className="govuk-input"
      id={name}
      data-testid={name}
      name={name}
      type={type}
      ref={register}
      aria-describedby={hint && `${name}-hint`}
      {...otherProps}
    />
  </div>
);

export default TextInput;
