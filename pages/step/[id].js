import { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { steps, stepPath, stepKeys } from 'components/Steps';

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
  const router = useRouter();
  useBeforeunload(() => "You'll lose your data!");
  const { id: stepId } = router.query;
  const firstStep = stepKeys[0];
  if (stepId && !formData.eligibilityCriteria && stepId !== firstStep) {
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
      {previousStep && (
        <Link href={stepPath} as={previousStep}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <main className="govuk-main-wrapper">
        <Step
          formData={formData}
          saveData={data => setFormData({ ...formData, ...data })}
          nextStep={nextStep}
        />
      </main>
    </div>
  );
};

export default FormWizard;
