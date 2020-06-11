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
      <TextInput {...getInputProps('business', 'businessName', register)} />
      <TextInput {...getInputProps('business', 'registeredName', register)} />
      <TextInput {...getInputProps('business', 'companyNumber', register)} />
      <TextInput
        {...getInputProps('business', 'registeredCharity', register)}
      />
      <Select {...getInputProps('business', 'companyStructureId', register)} />
      <TextInput
        {...getInputProps('business', 'councilRentAccountNumber', register)}
      />
      <TextInput
        {...getInputProps('business', 'ratesAccountNumber', register)}
      />
      <TextInput {...getInputProps('business', 'rateableValue', register)} />
      <TextInput {...getInputProps('business', 'councilTaxNumber', register)} />
      <AddressLookup
        {...getInputProps('business', 'businessAddress', register)}
        defaultValue={
          props.formData.business && props.formData.business.businessAddress
        }
        control={control}
        errorMessage={
          errors.business &&
          errors.business.businessAddress &&
          errors.business.businessAddress.message
        }
      />
      <TextInput
        {...getInputProps('business', 'businessDescription', register)}
      />
      <Select {...getInputProps('business', 'siteDescriptionId', register)} />

      <TextInput
        {...getInputProps('business', 'fullTimeEmployees', register)}
      />
      <TextInput
        {...getInputProps('business', 'percentageFallInIncome', register)}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
