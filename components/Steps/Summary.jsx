import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import SummaryList from 'components/SummaryList/SummaryList';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { getInputProps, stepPath } from 'components/Steps';

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
  const [error, setError] = useState(false);
  const submitForm = async () => {
    try {
      const { data } = await axios.post('/api/applications', formData);
      return Router.push({
        pathname: '/confirmation',
        query: { ref: data }
      });
    } catch (e) {
      setError(e.message);
    }
  };
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
        name="fixedPropertyCosts"
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
        name="businessBankAccount"
        title="Bank details:"
        slug="bank-details"
      />
      <SummarySection
        formData={formData}
        name="declaration"
        title="State Aid Declaration:"
        slug="declaration"
      />
      <button
        className="govuk-button"
        onClick={submitForm}
        type="button"
        disabled={error}
      >
        Confirm and submit
      </button>
      {error && (
        <ErrorSummary
          title="Unfortunately there was a problem with your submission."
          body="Please try again later."
        />
      )}
    </>
  );
};

export default Result;
