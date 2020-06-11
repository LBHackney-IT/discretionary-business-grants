import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = props => {
  const { register, control, errors, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Your Details</h1>
      <Select {...getInputProps('contact', 'contactTypeId', register)} />
      <TextInput {...getInputProps('contact', 'firstName', register)} />
      <TextInput {...getInputProps('contact', 'lastName', register)} />
      <TextInput {...getInputProps('contact', 'emailAddress', register)} />
      <TextInput {...getInputProps('contact', 'telephoneNumber', register)} />
      <AddressLookup
        {...getInputProps('contact', 'address', register)}
        defaultValue={props.formData.contact && props.formData.contact.address}
        control={control}
        errorMessage={
          errors.contact &&
          errors.contact.address &&
          errors.contact.address.message
        }
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
