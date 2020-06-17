import PropTypes from 'prop-types';
import Link from 'next/link';

import SummaryList from 'components/SummaryList/SummaryList';
import { getInputProps, stepPath } from 'components/Steps';

const MultiValue = value =>
  value !== '' && (
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
  slug
}) => (
  <div className="govuk-!-margin-bottom-9">
    <h2>{title}</h2>
    <SummaryList
      list={Object.entries(formData[name]).map(([key, value]) => ({
        title: getInputProps(name, key).label,
        value: Array.isArray(value)
          ? value.map(v => MultiValue(v.split('/').pop()))
          : typeof value === 'object'
          ? Object.values(value).map(MultiValue)
          : typeof value === 'boolean'
          ? JSON.stringify(value)
          : value
      }))}
    />
    {hasChangeLink && (
      <Link href={stepPath} as={`/step/${slug}`}>
        <a className="govuk-link">Change</a>
      </Link>
    )}
  </div>
);

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

const Summary = props =>
  sections.map(section => (
    <SummarySection key={section.slug} {...props} {...section} />
  ));

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  hasChangeLink: PropTypes.bool
};

export default Summary;
