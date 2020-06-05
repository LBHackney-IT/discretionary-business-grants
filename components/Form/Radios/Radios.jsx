const defaultOptions = [
  {
    label: 'Yes',
    value: 'Yes'
  },
  {
    label: 'No',
    value: 'No'
  }
];

const Radio = ({
  label,
  hint,
  name,
  options = defaultOptions,
  register,
  ...otherProps
}) => (
  <div className="govuk-form-group">
    <label className="govuk-label govuk-label--m" htmlFor={name}>
      {label}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    <div className="govuk-radios govuk-radios--inline">
      {options.map(({ label, value }) => (
        <div className="govuk-radios__item" key={label}>
          <input
            className="govuk-radios__input"
            id={`${name}_${label}`}
            name={name}
            type="radio"
            value={value}
            ref={register}
            aria-describedby={hint && `${name}-hint`}
            {...otherProps}
          />
          <label
            className="govuk-label govuk-radios__label"
            htmlFor={`${name}_${label}`}
          >
            {value}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default Radio;
