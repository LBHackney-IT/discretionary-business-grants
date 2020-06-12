import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import {
  VALID_BUSINESS_SIZE,
  VALID_RETEABLE_LIMIT_ANSWER
} from 'lib/dbMapping';

const Step1 = props => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const [showError, setShowError] = useState(false);
  const onSubmit = data => {
    const hasSomeDeclines = Object.entries(data.eligibilityCriteria).some(
      ([key, value]) =>
        (value === 'Yes' &&
          (key === 'servedLegalNotices' || key === 'receivedOtherGrants')) ||
        (key === 'rateableLimitAnswerId' &&
          VALID_RETEABLE_LIMIT_ANSWER.indexOf(value) === -1) ||
        (key === 'businessSizeId' && VALID_BUSINESS_SIZE.indexOf(value) === -1)
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
            {...getInputProps(
              'eligibilityCriteria',
              'tradingInHackney',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'businessSizeId',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Select
            {...getInputProps(
              'eligibilityCriteria',
              'typeOfBusinessId',
              {
                register
              },
              errors
            )}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'tradingOn20200311',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'servedLegalNotices',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'receivedOtherGrants',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'hasFixedPropertyCost',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'significantIncomeFall',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteria',
              'rateableLimitAnswerId',
              {
                register
              },
              errors
            )}
            onChange={() => setShowError(false)}
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
