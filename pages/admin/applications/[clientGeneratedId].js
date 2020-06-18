import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { redirectIfNotAuth } from 'utils/auth';
import Summary from 'components/Summary/Summary';

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
      const { data } = await axios.get(
        `/api/applications/${clientGeneratedId}`
      );
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
      <a
        className="govuk-back-link"
        role="button"
        onClick={() => router.back()}
      >
        Back
      </a>
      {data && (
        <>
          <h1>{data.business.businessName}</h1>
          <div className="govuk-body">
            Submitted: {new Date(data.applicationDate).toLocaleString()}
          </div>
          <div className="govuk-!-margin-top-7 govuk-!-margin-bottom-7">
            <p className="govuk-body">
              Email:{' '}
              <a href={`mailto:${data.contact.emailAddress}`} target="_blank">
                {data.contact.emailAddress}
              </a>
            </p>
            {data.contact.telephoneNumber && (
              <p className="govuk-body">
                Phone:{' '}
                <a href={`tel:${data.contact.emailAddress}`} target="_blank">
                  {data.contact.telephoneNumber}
                </a>
              </p>
            )}
          </div>
          <Summary formData={data} filterOut={['supplementaryInformation']} />
          <h2>Documents</h2>
          {data.documents.map(({ documentType, s3Path }) => (
            <div className="govuk-body">
              <a
                className="govuk-link"
                href={`/api/applications/${clientGeneratedId}/document/${s3Path}`}
                target="_blank"
              >
                {documentType}
              </a>
            </div>
          ))}
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export const getServerSideProps = redirectIfNotAuth;

export default ApplicationView;
