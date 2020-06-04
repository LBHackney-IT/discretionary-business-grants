import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import FileUpload from 'components/FileUpload/FileUpload';

const SupplementaryInformation = props => {
  const [fileLists, setFileLists] = useState(
    props.formData.supplementaryInformation || {}
  );
  const { handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = () => {
    props.saveData({ supplementaryInformation: fileLists });
    Router.push(stepPath, props.nextStep);
  };
  const handleFileUploaded = (file, name) =>
    setFileLists({
      ...fileLists,
      [name]: [...(fileLists[name] ? fileLists[name] : []), file]
    });
  const handleFileDelete = (filename, name) => {
    setFileLists({
      ...fileLists,
      [name]: fileLists[name].filter(file => file !== filename)
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Supplementary Information</h1>
      <FileUpload
        {...getInputProps('supplementaryInformation', 'businessAccounts', true)}
        sublabel="A copy of the business accounts (or a copy of the business Self Assessment tax return if applicable to your business) for the year 2018/19. If this is not available as the business is less than 1 year old, please provide what is available"
        hint="Companies House website link or a copy of the business accounts (or tax self assessment if you’re employed as a sole trader or a partner in a business partnership) for the previous two years 2017/18 and 2018/19 (if not available as the business is less than 2 years old, provide what is available)"
        fileList={fileLists['businessAccounts']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <FileUpload
        {...getInputProps(
          'supplementaryInformation',
          'fixedPropertyCosts',
          true
        )}
        sublabel="Evidence of ongoing fixed property cost (a copy of the business lease, rental agreement, mortgage statement, or licence for the business premises)"
        hint="Evidence of your annual business turnover (this can be from your business accounts or management accounts)"
        fileList={fileLists['fixedPropertyCosts']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <FileUpload
        {...getInputProps(
          'supplementaryInformation',
          'businessManagementAccounts',
          true
        )}
        sublabel="A copy of the business management accounts (including profit and loss account, turnover, balance sheet, and cash flow summary) for the last 12 months up to the grant application date"
        hint="A copy of your management accounts (including profit and loss account, balance sheet, and cash flow summary) for the last 6 months up to your grant application date"
        fileList={fileLists['businessManagementAccounts']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <FileUpload
        {...getInputProps('supplementaryInformation', 'bankStatements', true)}
        sublabel="6 months up to date bank statements for the business showing the name, address and account details. Relevant fixed property costs and employee salaries paid should be highlighted"
        hint="6 months up to date bank statements for your business showing the name, address and account details to enable payment of grant. Transaction details can be redacted but relevant fixed property costs and staff salary payments should be shown"
        fileList={fileLists['bankStatements']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <FileUpload
        {...getInputProps('supplementaryInformation', 'identity', true)}
        sublabel="One form of identity for the named applicant (passport or driving licence)"
        hint="One form of identify document for the name applicant (passport or driving licence)"
        fileList={fileLists['identity']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <FileUpload
        {...getInputProps(
          'supplementaryInformation',
          'payrollInformation',
          true
        )}
        sublabel="Company payroll information for the last 6 months showing the number of people employed and paid by the business (if available)"
        hint="If available, redacted company payroll information for the last 6 months showing the number of people employed and paid by the business."
        fileList={fileLists['payrollInformation']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        uploadPrefix={props.formData.contact.emailAddress}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default SupplementaryInformation;
