import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { redirectIfNotAuth } from 'utils/auth';
import { SummarySection } from 'components/Summary/Summary';

const ApplicationView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();
  const { clientGeneratedId } = router.query;
  const fetchData = useCallback(async clientGeneratedId => {
    if (!clientGeneratedId) {
      return null;
    }
    setError(false);
    try {
      const { data } = await axios.get(`/api/applications/${clientGeneratedId}`);
      setData(data.application);
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  useEffect(() => {
    fetchData(clientGeneratedId);
  }, [clientGeneratedId]);
  fetchData;

  return (
    <>
      <h1>Application {clientGeneratedId}</h1>
      {data && (
        <>
          <p>{new Date(data.applicationDate).toLocaleString()}</p>
          <SummarySection
            formData={data}
            name="eligibilityCriteria"
            title="Eligibility Criteria:"
            slug="eligibility-criteria"
            hasChangeLink={false}
          />
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export const getServerSideProps = redirectIfNotAuth;

export default ApplicationView;
