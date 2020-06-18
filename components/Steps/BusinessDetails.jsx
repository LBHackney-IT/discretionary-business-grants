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
      <TextInput {...getInputProps('business', 'businessName', { register }, errors)} />
      <TextInput {...getInputProps('business', 'registeredName', { register }, errors)} />
      <TextInput {...getInputProps('business', 'companyNumber', { register }, errors)} />
      <TextInput {...getInputProps('business', 'registeredCharity', { register }, errors)} />
      <Select {...getInputProps('business', 'companyStructureId', { register }, errors)} />
      <TextInput {...getInputProps('business', 'councilRentAccountNumber', { register }, errors)} />
      <TextInput {...getInputProps('business', 'ratesAccountNumber', { register }, errors)} />
      <TextInput {...getInputProps('business', 'rateableValue', { register }, errors)} />
      <TextInput {...getInputProps('business', 'councilTaxNumber', { register }, errors)} />
      <AddressLookup
        {...getInputProps('business', 'businessAddress', { register, control }, errors)}
        defaultValue={props.formData.business && props.formData.business.businessAddress}
      />
      <TextInput {...getInputProps('business', 'businessDescription', { register }, errors)} />
      <Select {...getInputProps('business', 'siteDescriptionId', { register }, errors)} />

      <TextInput {...getInputProps('business', 'fullTimeEmployees', { register }, errors)} />
      <TextInput {...getInputProps('business', 'percentageFallInIncome', { register }, errors)} />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
