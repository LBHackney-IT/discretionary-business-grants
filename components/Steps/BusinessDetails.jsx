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
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('business', 'businessDescription')}
        hint="What is the main business activity carried out"
        register={register}
      />
      <AddressLookup
        {...getInputProps('business', 'businessAddress')}
        defaultValue={
          props.formData.business && props.formData.business.businessAddress
        }
        control={control}
        register={register}
      />
      <AddressLookup
        {...getInputProps('business', 'businessPremisesAddress')}
        defaultValue={
          props.formData.business &&
          props.formData.business.businessPremisesAddress
        }
        control={control}
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'businessPremisesDescription')}
        hint="e.g shared office, shared workspace, individual shop, individual office, market stall etc"
        register={register}
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
        register={register({ required: true, validate: value => value !== '' })}
      />
      <TextInput
        {...getInputProps('business', 'businessRateAccountNumber')}
        type="number"
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'businessRegisteredCharity')}
        type="number"
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'councilRentAccountNumber')}
        type="number"
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'numberEmployes')}
        type="number"
        register={register({ min: 0 })}
      />
      <TextInput
        {...getInputProps('business', 'turnover')}
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
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
