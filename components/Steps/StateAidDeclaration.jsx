import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Checkbox } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const StateAidDeclaration = props => {
  const { register, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>State Aid Declaration</h1>
      <Checkbox
        {...getInputProps('stateAidDeclaration', 'isAuthorised')}
        register={register({ required: true })}
      />
      <Checkbox
        {...getInputProps('stateAidDeclaration', 'isNotExceedingAidLimit')}
        register={register({ required: true })}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default StateAidDeclaration;
