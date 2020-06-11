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
      <div className="govuk-inset-text">
        Where possible the bank account details provided should be your business
        bank account rather than your personal bank account.
      </div>
      <TextInput
        {...getInputProps('businessBankAccount', 'bankName')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('businessBankAccount', 'accountHolder')}
        register={register({ required: true })}
      />
      <TextInput
        {...getInputProps('businessBankAccount', 'accountNumber')}
        register={register({ required: true, minLength: 8, maxLength: 8 })}
      />
      <TextInput
        {...getInputProps('businessBankAccount', 'accountSortcode')}
        register={register({ required: true, minLength: 6, maxLength: 6 })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default BankDetails;
