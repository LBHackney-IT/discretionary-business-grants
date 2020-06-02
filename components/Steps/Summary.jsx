import Link from 'next/link';

import SummaryList from 'components/SummaryList/SummaryList';
import { getInputProps } from 'components/Steps';
import { stepPath } from 'components/Steps';

const SummarySection = ({ formData, name, title, slug }) => (
  <div className="govuk-!-margin-bottom-9">
    <h2>{title}</h2>
    <SummaryList
      list={Object.entries(formData[name]).map(([key, value]) => ({
        title: getInputProps(name, key).label,
        value:
          typeof value === 'object'
            ? Object.values(value).map(
                v =>
                  v !== '' && (
                    <>
                      <span key={v}>{v}</span>
                      <br />
                    </>
                  )
              )
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
        name="user"
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
