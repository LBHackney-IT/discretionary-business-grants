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
          <span id="step-hint" className="govuk-hint">
            Information to be verifiable with supplementary information as
            required below
          </span>
          <TextInput
            {...getInputProps('turnover', 'year1819')}
            type="number"
            register={register({ required: true })}
          />
          <TextInput
            {...getInputProps('turnover', 'year1920')}
            type="number"
            register={register({ required: true })}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default BusinessTurnover;
