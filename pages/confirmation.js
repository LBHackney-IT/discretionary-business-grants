import { useRouter } from 'next/router';

export default function confirmation() {
  const router = useRouter();
  const { ref } = router.query;
  if (!ref) return false;
  return (
    <div className="govuk-panel govuk-panel--confirmation">
      <h1 className="govuk-panel__title">Application complete</h1>
      <div className="govuk-panel__body">
        Your reference number
        <br />
        <strong>{ref}</strong>
      </div>
    </div>
  );
}
