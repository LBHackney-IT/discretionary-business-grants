import Link from 'next/link';

import SummaryList from 'components/SummaryList/SummaryList';
import { getInputProps } from 'components/Steps';
import { stepPath } from 'components/Steps';

const MultiValue = value =>
  value !== '' && (
    <div key={value}>
      <span>{value}</span>
      <br />
    </div>
  );

const SummarySection = ({ formData, name, title, slug }) => (
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
    <Link href={stepPath} as={`/step/${slug}`}>
      <a className="govuk-link">Change</a>
    </Link>
  </div>
);

const Result = ({ formData }) => {
  return (
    <>
      <h1>Summary</h1>
      <SummarySection
        formData={formData}
        name="contact"
        title="Your details:"
        slug="your-details"
      />
      <SummarySection
        formData={formData}
        name="business"
        title="Business details:"
        slug="business-details"
      />
      <SummarySection
        formData={formData}
        name="turnover"
        title="Business Turnover:"
        slug="business-turnover"
      />
      <SummarySection
        formData={formData}
        name="propertyCost"
        title="Fixed property related costs:"
        slug="property-costs"
      />
      <SummarySection
        formData={formData}
        name="supplementaryInformation"
        title="Supplementary Information:"
        slug="supplementary-information"
      />
      <SummarySection
        formData={formData}
        name="bank"
        title="Bank details:"
        slug="bank-details"
      />
      <SummarySection
        formData={formData}
        name="stateAidDeclaration"
        title="State Aid Declaration:"
        slug="state-aid-declaration"
      />
    </>
  );
};

export default Result;
