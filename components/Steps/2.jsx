import React from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

const Step1 = props => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    props.saveData(data);
    Router.push('/step/[id]', '/step/result');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2</h2>
      <label>
        foo:
        <input name="age" ref={register} defaultValue={props.formData.age} />
      </label>
      <label>
        bar:
        <input
          name="yearsOfExp"
          ref={register}
          defaultValue={props.formData.yearsOfExp}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Step1;
