import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { steps, stepPath, stepKeys } from 'components/Steps';

const getAdiacentSteps = step => {
  const currentStep = stepKeys.findIndex(s => s === step);
  return {
    previousStep: currentStep > 0 ? `/step/${stepKeys[currentStep - 1]}` : null,
    nextStep:
      currentStep < stepKeys.length
        ? `/step/${stepKeys[currentStep + 1]}`
        : null
  };
};

const FormWizard = ({ stepId }) => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  const [formData, setFormData] = useState({ firstName: 'asd' });
  const Step = steps[stepId];
  const { previousStep, nextStep } = getAdiacentSteps(stepId);
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

FormWizard.getInitialProps = async ({ query, res }) => {
  const firstStep = stepKeys[0];
  const stepId = query['[...id]'];
  console.log(firstStep);
  console.log('id', stepId);
  if (res && stepId !== firstStep) {
    res.writeHead(301, { Location: `/step/${firstStep}` });
    res.end();
  }
  return { stepId };
};

export default FormWizard;
