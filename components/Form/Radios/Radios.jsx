import cx from 'classnames';
import PropTypes from 'prop-types';

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
  error,
  ...otherProps
}) => (
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
    <div className="govuk-radios govuk-radios--inline">
      {options.map(({ label, value }, index) => (
        <div className="govuk-radios__item" key={label}>
          <input
            className={cx('govuk-radios__input', {
              'govuk-input--error': error
            })}
            id={`${name}_${label}`}
            name={name}
            type="radio"
            value={value || index + 1}
            ref={register}
            aria-describedby={hint && `${name}-hint`}
            {...otherProps}
          />
          <label
            className="govuk-label govuk-radios__label"
            htmlFor={`${name}_${label}`}
          >
            {label}
          </label>
        </div>
      ))}
    </div>
    {error && (
      <span className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </span>
    )}
  </div>
);

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  options: PropTypes.array,
  hint: PropTypes.string,
  error: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default Radio;
