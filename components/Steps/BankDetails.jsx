import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const BankDetails = props => {
  const { register, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Bank Details</h1>
      <TextInput
        {...getInputProps('bank', 'bankName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('bank', 'accountHolder')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('bank', 'accountNumber')}
        type="number"
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('bank', 'sortcode')}
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default BankDetails;
