import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Step1 from 'components/Steps/1';
import Step2 from 'components/Steps/2';
import Result from 'components/Steps/result';

const steps = {
  1: Step1,
  2: Step2,
  result: Result
};

const getPreviousStep = step => {
  const currentStep = Object.keys(steps).findIndex(s => s === step);
  return currentStep > 0 ? Object.keys(steps)[currentStep - 1] : null;
};

const FormWizard = () => {
  const [formData, setFormData] = useState({ firstName: 'asd' });
  const router = useRouter();
  const { id } = router.query;
  const Step = steps[id];
  if (!Step) {
    return null;
  }
  const previousStep = getPreviousStep(id);
  return (
    <div className="govuk-width-container">
      {previousStep && (
        <Link href="/step/[id]" as={`/step/${previousStep}`}>
          <a className="govuk-back-link">Back</a>
        </Link>
      )}
      <main className="govuk-main-wrapper">
        <Step
          formData={formData}
          saveData={data => setFormData({ ...formData, ...data })}
        />
      </main>
    </div>
  );
};

export default FormWizard;
