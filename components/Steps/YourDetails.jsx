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
      <Select
        {...getInputProps('contact', 'authority')}
        options={['PSC', 'Trustee', 'Agent', 'Owner', 'Partner', 'Employee']}
        register={register({
          required: true,
          validate: value => value !== ''
        })}
      />
      <TextInput
        {...getInputProps('contact', 'firstName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('contact', 'lastName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('contact', 'emailAddress')}
        type="email"
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('contact', 'telephoneNumber')}
        type="tel"
        register={register}
      />
      <AddressLookup
        {...getInputProps('contact', 'address')}
        defaultValue={props.formData.contact && props.formData.contact.address}
        control={control}
        register={register}
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
