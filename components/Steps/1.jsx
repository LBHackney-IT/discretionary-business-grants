import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';

const Step1 = props => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    props.saveData(data);
    Router.push('/step/[id]', '/step/2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <TextInput
        label="First Name:"
        name="firstName"
        register={register}
        defaultValue={props.formData.firstName}
      />
      <TextInput
        label="Last Name:"
        name="lastName"
        register={register}
        defaultValue={props.formData.lastName}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
