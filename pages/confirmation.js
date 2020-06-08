import { useRouter } from 'next/router';

export default function confirmation() {
  const router = useRouter();
  const { ref } = router.query;
  if (!ref) return false;
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
      <div className="govuk-!-margin-top-9">
        <p className="govuk-body">
          Thank you for completing the Local Authority Discretionary Grant Fund
          application.
        </p>
        <p className="govuk-body">
          Your unique reference code is <strong>{ref}</strong> Kindly make a
          note of this reference.
        </p>
        <p className="govuk-body">
          <div class="govuk-warning-text">
            <span class="govuk-warning-text__icon" aria-hidden="true">
              !
            </span>
            <strong class="govuk-warning-text__text">
              <span class="govuk-warning-text__assistive">Warning</span>
              All applicants are advised to save and/or print a copy of their
              application result.
            </strong>
          </div>
        </p>
      </div>
    </div>
  );
}
