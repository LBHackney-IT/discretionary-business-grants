import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios } from 'components/Form';

const Step1 = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const onSubmit = data => {
    props.saveData(data);
    Router.push('/step/[id]', '/step/2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <Radios
        title="Is your business based in and trading in Hackney?"
        name="eligibility.isBasedOnHackney"
        register={register({ required: true })}
      />
      <Radios
        title="Is your business classes as either a small or micro business?"
        name="eligibility.isSmallBusiness"
        register={register({ required: true })}
      />
      <Radios
        title="Was your business trading on the 11th March 2020?"
        name="eligibility.beforeDate"
        register={register({ required: true })}
      />
      <Radios
        title="Is your business in administration, insolvent or in receipt of a striking off notice?"
        name="eligibility.isInsolvent"
        register={register({ required: true })}
      />
      <Radios
        title="Has your business either received or is eligible for either a Small Business Grant or a Retail, Hospitality and Leisure Grant?"
        name="eligibility.hasReceived"
        register={register({ required: true })}
      />
      <Radios
        title="Does your business have an annual fixed property cost (this could be annual rent, annual mortgage, annual market pitch fee, annual storage cost)?"
        name="eligibility.hasFixedPropertyCost"
        register={register({ required: true })}
      />
      <Radios
        title="Has your business experienced a fall in income of at least 30% as a result of Covid-19?"
        name="eligibility.hasFallInIncome"
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
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
