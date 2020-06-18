import cx from 'classnames';

const TextInput = ({ label, hint, name, register, error, type = 'text', inputClassName, ...otherProps }) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error
    })}
  >
    <label className="govuk-label govuk-label--m" htmlFor={name}>
      {label}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {error && (
      <span className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </span>
    )}
    <input
      className={cx('govuk-input', inputClassName, {
        'govuk-input--error': error
      })}
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
