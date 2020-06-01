import React from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Checkbox, TextInput, Select } from 'components/Form';
import { stepPath, stepKeys } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = props => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Business Details</h1>
      <TextInput
        label="Business Name:"
        name="businessName"
        register={register}
      />
      <AddressLookup
        label="Business Address:"
        name="businessAddress"
        defaultValue={props.formData.businessAddress}
        control={control}
      />
      <TextInput
        label="Company Number:"
        name="companyNumber"
        type="number"
        register={register}
      />
      <Select
        label="Company Structure:"
        name="companyStructure"
        options={[
          'Registered Company',
          'Sole Trader',
          'Partnership',
          'Charity',
          'Social Enterprise'
        ]}
        register={register({ required: true })}
      />
      <TextInput
        label="Business Rates Account Number:"
        name="businessRateAccountNumber"
        type="number"
        register={register}
      />
      <TextInput
        label="Number of Full Time Employes:"
        name="numberEmployes"
        type="number"
        register={register({ min: 0 })}
      />
      <TextInput
        label="Percentage fall in income due to Covid-19:"
        name="percentageFallIncome"
        type="number"
        register={register({ min: 0, max: 100 })}
      />
      <TextInput
        label="Business premises rateable value:"
        name="businessPremises"
        type="number"
        register={register({ min: 0 })}
      />
      <h3>Fixed property related costs</h3>
      <TextInput
        label="Per Annum:"
        name="fixedPropAnnum"
        type="number"
        register={register({ min: 0 })}
      />
      <TextInput
        label="Items included:"
        name="fixedPropItems"
        register={register}
      />
      <h3>I confirm that this business:</h3>
      <Checkbox
        label="Was trading on 11th March 2021"
        name="wasTradingBefore"
        register={register({ required: true })}
      />
      <Checkbox
        label="Was ineligible to access funding from the Small Business Grant Fund, or Retail, Leisure and Hospitality Grant Fund"
        name="wasIneligible"
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
