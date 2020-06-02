import PropTypes from 'prop-types';

const Select = ({ label, name, options, selected, onChange, register }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={name}>
      {label}
    </label>
    <select
      className="govuk-select"
      id={name}
      name={name}
      ref={register}
      onChange={e => onChange && onChange(e.target.value)}
    >
      <option key="empty" value=""></option>
      {options.map(option => {
        const { value, text } =
          typeof option === 'string' ? { value: option, text: option } : option;
        return (
          <option key={value} value={value} selected={value === selected}>
            {text}
          </option>
        );
      })}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ])
  ),
  selected: PropTypes.string,
  register: PropTypes.func
};

export default Select;
