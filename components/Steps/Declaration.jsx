import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Checkbox, DateInput, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

import { STATE_AID_OPTION_WITH_MORE_Q } from 'lib/dbMapping';

const Declaration = props => {
  const [showOtherQuestions, setShowOtherQuestions] = useState(false);
  const { register, errors, control, watch, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };
  const selectedStateAid = watch('declaration.stateAidOptionId');
  useEffect(() => {
    setShowOtherQuestions(STATE_AID_OPTION_WITH_MORE_Q.indexOf(selectedStateAid) !== -1);
  }, [selectedStateAid]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Declaration</h1>
      <Radios {...getInputProps('declaration', 'stateAidOptionId', { register }, errors)} />
      {showOtherQuestions && (
        <>
          <DateInput {...getInputProps('declaration', 'dateOfAid', { control }, errors)} />
          <TextInput
            {...getInputProps(
              'declaration',
              'organisationProvidingAid',
              {
                register
              },
              errors
            )}
          />
          <TextInput {...getInputProps('declaration', 'stateAidReceived', { register }, errors)} />
          <Radios {...getInputProps('declaration', 'permittedToAcceptStateAidGrant', { register }, errors)} />
        </>
      )}
      <h2>How we will use your information</h2>
      <p className="govuk-body">
        The Council will not accept deliberate manipulation and fraud. Any business caught falsifying their records to
        gain additional grant money will face prosecution and any funding issued will be subject to clawback. We will
        use your information to assess your application for financial support. In doing so we will confirm information
        about you and your account from Council departments and credit reference agencies to confirm account validity
        and your identity. If you provide false or inaccurate information, we will record this. If you would like full
        details on how we use your information, please refer to our privacy policy.
      </p>
      <h2>Declaration</h2>
      <p className="govuk-body">
        The information provided will be used for the purpose of administering the Discretionary Business Support Grant.
      </p>
      <p className="govuk-body">
        I can confirm that the information I have supplied is true and correct, to the best of my knowledge, and makes
        me eligible for Grant funding under this scheme.
      </p>
      <p className="govuk-body">
        I understand that should I provide false information, or make a false statement, I may be liable to prosecution.
      </p>
      <p className="govuk-body">
        The Local Authority and the Government will review the payments made and have the power to recover any wrongly
        claimed Grants.
      </p>
      <Checkbox
        {...getInputProps(
          'declaration',
          'readUnderstoodDeclaration',
          {
            register
          },
          errors
        )}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Declaration;
