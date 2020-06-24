import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';

import SummaryList from 'components/SummaryList/SummaryList';
import ExpandableDetails from 'components/ExpandableDetails/ExpandableDetails';
import { getInputProps, stepPath } from 'components/Steps';

const MultiValue = value => (
  <div key={value}>
    <span>{value}</span>
    <br />
  </div>
);

export const SummarySection = ({
  formData,
  hasChangeLink,
  name,
  title,
  slug,
  register,
  isExpandable
}) => {
  const Summary = (
    <SummaryList
      register={register}
      name={name}
      list={Object.entries(formData[name])
        .filter(([, value]) => value)
        .map(([key, value]) => ({
          key,
          title: getInputProps(name, key).label,
          value: Array.isArray(value)
            ? value.filter(Boolean).map(v => MultiValue(v.split('/').pop()))
            : typeof value === 'object'
            ? Object.values(value)
                .filter(Boolean)
                .map(MultiValue)
            : typeof value === 'boolean'
            ? JSON.stringify(value)
            : value
        }))}
    />
  );
  return (
    <div
      className={cx({
        'govuk-!-margin-bottom-9': !isExpandable,
        'govuk-!-margin-bottom-7': isExpandable
      })}
    >
      <h2>{title}</h2>
      {isExpandable ? (
        <ExpandableDetails>{Summary}</ExpandableDetails>
      ) : (
        Summary
      )}
      {hasChangeLink && (
        <Link href={stepPath} as={`/step/${slug}`}>
          <a className="govuk-link">Change</a>
        </Link>
      )}
    </div>
  );
};

const sections = [
  {
    name: 'eligibilityCriteria',
    title: 'Eligibility Criteria:',
    slug: 'eligibility-criteria'
  },
  {
    name: 'contact',
    title: 'Your details:',
    slug: 'your-details'
  },
  {
    name: 'business',
    title: 'Business details:',
    slug: 'business-details'
  },
  {
    name: 'turnover',
    title: 'Business Turnover:',
    slug: 'business-turnover'
  },
  {
    name: 'fixedPropertyCosts',
    title: 'Fixed property related costs:',
    slug: 'property-costs'
  },
  {
    name: 'supplementaryInformation',
    title: 'Supplementary Information:',
    slug: 'supplementary-information'
  },
  {
    name: 'businessBankAccount',
    title: 'Bank details:',
    slug: 'bank-details'
  },
  {
    name: 'declaration',
    title: 'State Aid Declaration:',
    slug: 'declaration'
  }
];

const Summary = ({ filterOut, ...props }) =>
  sections
    .filter(section => !filterOut || filterOut.indexOf(section.name) === -1)
    .map(section => (
      <SummarySection key={section.slug} {...props} {...section} />
    ));

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  filterOut: PropTypes.arrayOf(PropTypes.string),
  isExpandable: PropTypes.bool,
  hasChangeLink: PropTypes.bool
};

export default Summary;
