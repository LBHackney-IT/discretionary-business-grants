import cx from 'classnames';
import PropTypes from 'prop-types';

const defaultOptions = ['Yes', 'No'];

const Radio = ({
  label,
  hint,
  name,
  options = defaultOptions,
  register,
  error,
  children,
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
    {children}
    <div className="govuk-radios govuk-radios--inline">
      {options.map(option => (
        <div className="govuk-radios__item" key={option}>
          <input
            className={cx('govuk-radios__input', {
              'govuk-input--error': error
            })}
            id={`${name}_${option}`}
            name={name}
            type="radio"
            value={option}
            ref={register}
            aria-describedby={hint && `${name}-hint`}
            {...otherProps}
          />
          <label
            className="govuk-label govuk-radios__label"
            htmlFor={`${name}_${option}`}
          >
            {option}
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
  children: PropTypes.node,
  error: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default Radio;
