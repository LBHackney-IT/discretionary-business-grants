import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

const Step1 = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const [showError, setShowError] = useState(false);
  const onSubmit = data => {
    const hasSomeDeclines = Object.values(data.eligibility).some(
      answer => answer === 'no'
    );
    setShowError(hasSomeDeclines);
    if (!hasSomeDeclines) {
      props.saveData(data);
      Router.push(stepPath, props.nextStep);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Eligibility Criteria</h1>
      <Radios
        {...getInputProps('eligibility', 'isBasedInHackney')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'isSmallBusiness')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'beforeDate')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'isInsolvent')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'hasReceived')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'hasFixedPropertyCost')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'hasFallInIncome')}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        {...getInputProps('eligibility', 'hasReteableValue')}
        options={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
          { label: 'Not Applicable', value: 'Not Applicable' }
        ]}
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      {showError && (
        <ErrorSummary
          title="Unfortunately you are not eligible for this grant."
          body="The information provided does not meet the specified requirements."
        />
      )}
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
