import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const BusinessTurnover = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="step-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Business Turnover</h1>
          </legend>
          <div className="govuk-inset-text">
            <p>
              Please provide information below on your business turnover to help
              demonstrate the impact of Covid-19 on your business.
            </p>
            <p>Fields require numeric values e.g 10000 for £10,000.</p>
          </div>
          <TextInput
            {...getInputProps('turnover', 'turnover')}
            register={register({ required: true, min: 0 })}
          />
          <TextInput
            {...getInputProps('turnover', 'year1819')}
            register={register({ required: true, min: 0 })}
          />
          <TextInput
            {...getInputProps('turnover', 'year1920')}
            register={register({ required: true, min: 0 })}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default BusinessTurnover;
