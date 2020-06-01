import React from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath, stepKeys } from 'components/Steps';

const Step1 = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2</h2>
      <TextInput label="First Name:" name="firstName" register={register} />
      <TextInput label="Last Name:" name="lastName" register={register} />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
