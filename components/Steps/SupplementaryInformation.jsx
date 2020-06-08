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
      <div class="govuk-inset-text">
        File upload information{' '}
        <p>
          Preferred file formats are PDF, JPeg, PNG, Word, Excel (CSV files).
          File size is limited to 20MB per file. Multiple files can be uploaded.
          If uploading a scanned or photographed document, ensure that it is
          clear and legible.
        </p>
      </div>
      <ControlledFileUpload
        {...sharedProps('businessAccounts')}
        hint="Please provide a company of the business accounts for the financial year 2018/19 (or your HMRC self assessment tax return for the financial year 2018/19). If not available please provide what is available"
      />
      <ControlledFileUpload
        {...sharedProps('fixedPropertyCosts')}
        hint="Please provide evidence of your ongoing fixed property costs (such as the lease, licence, rental agreement or mortgage statement for the business premises)"
      />
      <ControlledFileUpload
        {...sharedProps('fallInIncome')}
        hint=" Please provide financial evidence showing the fall in income experienced by your business as a result of Covid-19 (such as; up to date business management accounts for the last 12 months showing profit and loss, turnover, cashflow and balance sheet. Bank statements over the past 6 months)"
      />
      <ControlledFileUpload
        {...sharedProps('identity')}
        hint="Please provide a form of photo identification such as a passport or driving licence"
      />
      <ControlledFileUpload
        {...sharedProps('payrollInformation')}
        hint="If available please provide your business payroll information for the last 6 months showing the number of people employed and paid by the business"
        rules={null}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default SupplementaryInformation;
