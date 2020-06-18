import { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';

import Summary from 'components/Summary/Summary';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { set } from 'utils/persistency';

const Result = ({ formData, clearFormData }) => {
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    Router.prefetch('/confirmation');
  }, []);
  const submitForm = async () => {
    try {
      setSubmitting(true);
      const { data } = await axios.post('/api/applications', formData);
      set(data, formData);
      clearFormData();
      return Router.push({
        pathname: '/confirmation',
        query: { ref: data }
      });
    } catch (e) {
      setSubmitting(false);
      setError(e.message);
    }
  };
  if (submitting) return null;
  return (
    <>
      <h1>Summary</h1>
      <Summary formData={formData} hasChangeLink />
      <button
        className="govuk-button"
        onClick={submitForm}
        type="button"
        disabled={submitting}
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
