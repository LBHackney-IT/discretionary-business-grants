const defaultOptions = [
  {
    label: 'Yes',
    value: 'yes'
  },
  {
    label: 'No',
    value: 'no'
  }
];

const Checkbox = ({
  title,
  subtitle,
  name,
  options = defaultOptions,
  register,
  ...otherProps
}) => (
  <div className="govuk-form-group">
    <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
        <span className="govuk-fieldset__heading">{title}</span>
      </legend>
      {subtitle && (
        <span id="changed-name-hint" className="govuk-hint">
          {subtitle}
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
    </fieldset>
  </div>
);

export default Checkbox;
