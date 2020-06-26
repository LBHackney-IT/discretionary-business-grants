import { useRouter } from 'next/router';

import Summary from 'components/Summary/Summary';
import WarningText from 'components/WarningText/WarningText';
import { get } from 'utils/persistency';

export default function confirmation() {
  const router = useRouter();
  const { ref } = router.query;
  if (!ref) return false;
  const formData = get(ref);
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Application complete</h1>
        <div className="govuk-panel__body">
          Your reference code
          <br />
          <strong>{ref}</strong>
        </div>
      </div>
      <div className="govuk-!-margin-9">
        <p className="govuk-body">
          Thank you for completing the Local Authority Discretionary Grant Fund
          application.
        </p>
        <p className="govuk-body">
          Your unique reference code is <strong>{ref}</strong> Kindly make a
          note of this reference.
        </p>
        <WarningText>
          All applicants are advised to save and/or print a copy of their
          application.
        </WarningText>
      </div>
      {formData && (
        <div>
          <h2 className="govuk-heading-l">Summary</h2>
          <Summary formData={formData} />
        </div>
      )}
    </div>
  );
}
