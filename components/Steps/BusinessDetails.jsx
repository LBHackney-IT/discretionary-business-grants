import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Checkbox, TextInput, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
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
        {...getInputProps('business', 'businessName')}
        register={register}
      />
      <AddressLookup
        {...getInputProps('business', 'businessAddress')}
        defaultValue={props.formData.business.businessAddress}
        control={control}
      />
      <TextInput
        {...getInputProps('business', 'companyNumber')}
        type="number"
        register={register}
      />
      <Select
        {...getInputProps('business', 'companyStructure')}
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
        {...getInputProps('business', 'businessRateAccountNumber')}
        type="number"
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'numberEmployes')}
        type="number"
        register={register({ min: 0 })}
      />
      <TextInput
        {...getInputProps('business', 'percentageFallIncome')}
        type="number"
        register={register({ min: 0, max: 100 })}
      />
      <TextInput
        {...getInputProps('business', 'businessPremises')}
        type="number"
        register={register({ min: 0 })}
      />
      <h3>Fixed property related costs</h3>
      <TextInput
        {...getInputProps('business', 'fixedPropAnnum')}
        type="number"
        register={register({ min: 0 })}
      />
      <TextInput
        {...getInputProps('business', 'fixedPropItems')}
        register={register}
      />
      <h3>I confirm that this business:</h3>
      <Checkbox
        {...getInputProps('business', 'wasTradingBefore')}
        register={register({ required: true })}
      />
      <Checkbox
        {...getInputProps('business', 'wasIneligible')}
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
