import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath } from 'components/Steps';

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
        label="Bank Name:"
        name="bankName"
        register={register({ required: true })}
      />
      <TextInput
        label="Account Holder Name:"
        name="accountHolder"
        register={register({ required: true })}
      />
      <TextInput
        label="Account Number:"
        name="accountNumber"
        type="number"
        register={register({ required: true })}
      />
      <TextInput
        label="Sort Code:"
        name="sortcode"
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default BankDetails;
