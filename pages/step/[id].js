import React, { useState } from 'react';
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

const FormWizard = ({ id }) => {
  const [formData, setFormData] = useState({ firstName: 'asd' });
  const Step = steps[id];
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

FormWizard.getInitialProps = async ({ query: { id }, res }) => {
  if (res && id !== '1') {
    res.writeHead(301, { Location: '/step/1' });
    res.end();
  }
  return { id };
};

export default FormWizard;
