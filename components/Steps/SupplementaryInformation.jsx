import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ControlledFileUpload from 'components/FileUpload/FileUpload';

const SupplementaryInformation = props => {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = formData => {
    props.saveData(formData);
    Router.push(stepPath, props.nextStep);
  };
  const sharedProps = name => ({
    ...getInputProps('supplementaryInformation', name),
    errorMessage:
      errors.supplementaryInformation &&
      errors.supplementaryInformation[name] &&
      errors.supplementaryInformation[name].message,
    uploadPrefix: props.formData.contact && props.formData.contact.emailAddress,
    control,
    defaultValue:
      props.formData.supplementaryInformation &&
      props.formData.supplementaryInformation[name],
    rules: { validate: value => value.length > 0 || 'Document required' }
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Supplementary Information</h1>
      <div className="govuk-inset-text">
        File upload information{' '}
        <p>
          Preferred file formats are PDF, JPeg, PNG, Word, Excel (CSV files).
          File size is limited to 20MB per file. Multiple files can be uploaded.
          If uploading a scanned or photographed document, ensure that it is
          clear and legible.
        </p>
      </div>
      <ControlledFileUpload {...sharedProps('businessAccounts')} />
      <ControlledFileUpload {...sharedProps('fixedPropertyCosts')} />
      <ControlledFileUpload {...sharedProps('fallInIncome')} />
      <ControlledFileUpload {...sharedProps('identity')} />
      <ControlledFileUpload
        {...sharedProps('payrollInformation')}
        rules={null}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default SupplementaryInformation;
