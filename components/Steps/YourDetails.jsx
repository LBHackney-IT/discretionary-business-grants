import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = props => {
  const { register, control, handleSubmit } = useForm({
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
        {...getInputProps('user', 'authority')}
        options={['PSC', 'Trustee', 'Agent', 'Owner', 'Partner', 'Employee']}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('user', 'firstName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('user', 'lastName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('user', 'email')}
        type="email"
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('user', 'tel')}
        type="tel"
        register={register}
      />
      <AddressLookup
        {...getInputProps('user', 'address')}
        defaultValue={props.formData.user && props.formData.user.address}
        control={control}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
