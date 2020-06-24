import PropTypes from 'prop-types';

import { Checkbox } from 'components/Form';

const SummaryList = ({ list, name, register }) => (
  <dl className="govuk-summary-list">
    {list &&
      list.map(({ key, title, adminValidation, value, href }) => (
        <div key={key} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{title}</dt>
          <dd className="govuk-summary-list__value">{value}</dd>
          {href && (
            <dd className="govuk-summary-list__actions">
              <a className="govuk-link" href="#">
                Change
                <span className="govuk-visually-hidden"> {title}</span>
              </a>
            </dd>
          )}
          {register && (
            <dd className="govuk-summary-list__actions" style={{ width: 40 }}>
              {adminValidation && (
                <Checkbox name={`${name}.${key}`} register={register} />
              )}
            </dd>
          )}
        </div>
      ))}
  </dl>
);

SummaryList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      href: PropTypes.string
    }).isRequired
  )
};

export default SummaryList;
