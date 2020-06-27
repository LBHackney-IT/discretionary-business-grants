import { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import * as HttpStatus from 'http-status-codes';

import { steps, stepPath, stepKeys } from 'components/Steps';
import { isExpired } from 'utils/date';

const getAdjacentSteps = step => {
  const currentStep = stepKeys.findIndex(s => s === step);
  return {
    previousStep: currentStep > 0 ? `/step/${stepKeys[currentStep - 1]}` : null,
    nextStep:
      currentStep < stepKeys.length
        ? `/step/${stepKeys[currentStep + 1]}`
        : null
  };
};

const FormWizard = () => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  useBeforeunload(() => "You'll lose your data!");
  const { id: stepId } = router.query;
  const firstStep = stepKeys[0];
  if (
    stepId &&
    !isSubmitted &&
    !formData.eligibilityCriteria &&
    stepId !== firstStep
  ) {
    Router.replace(`/step/${firstStep}`);
    return null;
  }
  const Step = steps[stepId];
  if (!Step) {
    return null;
  }
  const { previousStep, nextStep } = getAdjacentSteps(stepId);
  return (
    <div className="govuk-width-container">
      {previousStep && !isSubmitted && (
        <Link href={stepPath} as={previousStep}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <main className="govuk-main-wrapper">
        <Step
          formData={formData}
          saveData={data => setFormData({ ...formData, ...data })}
          nextStep={nextStep}
          clearFormData={() => {
            setIsSubmitted(true);
            setFormData({});
          }}
        />
      </main>
    </div>
  );
};

export default FormWizard;

export async function getServerSideProps({ res }) {
  if (
    process.env.EXPIRATION_DATE &&
    isExpired(new Date(process.env.EXPIRATION_DATE), new Date())
  ) {
    res.writeHead(HttpStatus.MOVED_TEMPORARILY, {
      Location: '/'
    });
    res.end();
  }
  return {
    props: {}
  };
}
