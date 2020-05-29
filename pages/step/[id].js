import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Step1 from 'components/Steps/1';
import Step2 from 'components/Steps/2';
import Result from 'components/Steps/result';

const steps = {
  1: Step1,
  2: Step2,
  result: Result
};

const FormWizard = () => {
  const [formData, setFormData] = useState({ firstName: 'asd' });
  const router = useRouter();
  const { id } = router.query;
  const Step = steps[id];
  if (!Step) {
    return null;
  }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <Step
              formData={formData}
              saveData={data => setFormData({ ...formData, ...data })}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormWizard;
