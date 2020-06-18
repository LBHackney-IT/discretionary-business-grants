import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

import Summary from 'components/Summary/Summary';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { set } from 'utils/persistency';

const Result = ({ formData }) => {
  const [error, setError] = useState(false);
  const [submitting, SetSubmitting] = useState(false);
  const submitForm = async () => {
    try {
      SetSubmitting(true);
      const { data } = await axios.post('/api/applications', formData);
      set(data, formData);
      return Router.push({
        pathname: '/confirmation',
        query: { ref: data }
      });
    } catch (e) {
      SetSubmitting(false);
      setError(e.message);
    }
  };
  return (
    <>
      <h1>Summary</h1>
      <Summary formData={formData} hasChangeLink />
      <button className="govuk-button" onClick={submitForm} type="button" disabled={submitting}>
        Confirm and submit
      </button>
      {error && (
        <ErrorSummary title="Unfortunately there was a problem with your submission." body="Please try again later." />
      )}
    </>
  );
};

export default Result;
