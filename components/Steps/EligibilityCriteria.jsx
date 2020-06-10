import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

const Step1 = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const [showError, setShowError] = useState(false);
  const onSubmit = data => {
    const hasSomeDeclines = Object.entries(data.eligibilityCriteria).some(
      ([key, value]) =>
        (value === 'Yes' &&
          (key === 'servedLegalNotices' || key === 'receivedOtherGrants')) ||
        (value === '2' && key === 'rateableLimitAnswerId') ||
        (value === '3' && key === 'businessSizeId')
    );
    setShowError(hasSomeDeclines);
    if (!hasSomeDeclines) {
      props.saveData(data);
      Router.push(stepPath, props.nextStep);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="step-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Eligibility Criteria</h1>
          </legend>
          <span id="step-hint" className="govuk-hint">
            Applicants must meet all the eligibility questions to proceed to the
            next section
          </span>
          <Radios
            {...getInputProps('eligibilityCriteria', 'tradingInHackney')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'businessSizeId')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Select
            {...getInputProps('eligibilityCriteria', 'typeOfBusinessId')}
            register={register({
              required: true,
              validate: value => value !== ''
            })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'tradingOn20200311')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'servedLegalNotices')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'receivedOtherGrants')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'hasFixedPropertyCost')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'significantIncomeFall')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'rateableLimitAnswerId')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
        </fieldset>
      </div>
      {showError && (
        <ErrorSummary
          title="Unfortunately you are not eligible for this grant."
          body="The information provided does not meet the specified requirements."
        />
      )}
      {!showError && (
        <Button className="govuk-button" text="Next" type="submit" />
      )}
    </form>
  );
};

export default Step1;
