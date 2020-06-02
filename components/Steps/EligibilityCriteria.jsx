import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios } from 'components/Form';
import { stepPath } from 'components/Steps';
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
        title="Is your business based in and trading in Hackney?"
        name="eligibility.isBasedInHackney"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Is your business classed as either a small or micro business?"
        name="eligibility.isSmallBusiness"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Was your business trading on the 11th March 2020?"
        name="eligibility.beforeDate"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Is your business in administration, insolvent or in receipt of a striking off notice?"
        name="eligibility.isInsolvent"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Has your business either received or is eligible for either a Small Business Grant or a Retail, Hospitality and Leisure Grant?"
        name="eligibility.hasReceived"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Does your business have an annual fixed property cost (this could be annual rent, annual mortgage, annual market pitch fee, annual storage cost)?"
        name="eligibility.hasFixedPropertyCost"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="Has your business experienced a fall in income of at least 30% as a result of Covid-19?"
        name="eligibility.hasFallInIncome"
        onChange={() => setShowError(false)}
        register={register({ required: true })}
      />
      <Radios
        title="If you have an individual business rates account does your premises have a rateable value of £60k or less?"
        name="eligibility.hasReteableValue"
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
