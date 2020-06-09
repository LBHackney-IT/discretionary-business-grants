import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = props => {
  const { register, handleSubmit, errors, control } = useForm({
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
        {...getInputProps('business', 'registeredName')}
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'companyNumber')}
        type="number"
        register={register}
      />
      <Select
        {...getInputProps('business', 'companyStructureId')}
        register={register({ required: true, validate: value => value !== '' })}
      />
      <TextInput
        {...getInputProps('business', 'councilRentAccountNumber')}
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'ratesAccountNumber')}
        register={register}
      />
      <TextInput
        {...getInputProps('business', 'registeredCharity')}
        register={register}
      />
      <AddressLookup
        {...getInputProps('business', 'businessAddress')}
        defaultValue={
          props.formData.business && props.formData.business.businessAddress
        }
        control={control}
        register={register}
        errorMessage={
          errors.business &&
          errors.business.businessAddress &&
          errors.business.businessAddress.message
        }
      />
      <TextInput
        {...getInputProps('business', 'businessDescription')}
        register={register}
      />
      <Select
        {...getInputProps('business', 'siteDescriptionId')}
        register={register({ required: true, validate: value => value !== '' })}
      />
      <TextInput
        {...getInputProps('business', 'councilTaxNumber')}
        register={register}
      />

      <TextInput
        {...getInputProps('business', 'fullTimeEmployees')}
        register={register({ min: 0 })}
      />
      <TextInput
        {...getInputProps('business', 'percentageFallInIncome')}
        register={register({ min: 0, max: 100 })}
      />
      <TextInput
        {...getInputProps('business', 'rateableValue')}
        type="number"
        register={register({ min: 0 })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
