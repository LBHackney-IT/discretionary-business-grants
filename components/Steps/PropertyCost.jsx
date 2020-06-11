import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const PropertyCost = props => {
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
            <h1 className="govuk-fieldset__heading">
              Fixed property related costs
            </h1>
          </legend>
          <span id="step-hint" className="govuk-hint">
            Fixed property related costs (please specify how much your fixed
            property costs are per annum and state what these include e.g annual
            business premises rent or annual business premises mortgage amount).
            Information to be verifiable with supplementary information as
            required below.
          </span>
          <TextInput
            {...getInputProps('fixedPropertyCosts', 'year2018To2019')}
            register={register({ required: true })}
          />
          <TextInput
            {...getInputProps('fixedPropertyCosts', 'year2019To2020')}
            register={register({ required: true })}
          />
          <TextInput
            {...getInputProps('fixedPropertyCosts', 'itemsIncluded')}
            register={register({ required: true })}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default PropertyCost;
