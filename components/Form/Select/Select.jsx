import PropTypes from 'prop-types';

const Select = ({ label, name, options, selected, register }) => (
  <div class="govuk-form-group">
    <label class="govuk-label" for={name}>
      {label}
    </label>
    <select class="govuk-select" id={name} name={name} ref={register}>
      {options.map(option => (
        <option value={option} selected={option === selected}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selected: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired
};

export default Select;
