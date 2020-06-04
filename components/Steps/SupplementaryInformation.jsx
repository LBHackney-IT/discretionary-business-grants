import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button } from 'components/Form';
import { stepPath } from 'components/Steps';
import FileUpload from 'components/FileUpload/FileUpload';

const SupplementaryInformation = props => {
  const [fileLists, setFileLists] = useState(props.formData.documents || {});
  const { handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = () => {
    console.log(fileLists);
    props.saveData({ documents: fileLists });
    Router.push(stepPath, props.nextStep);
  };
  const handleFileUploaded = (file, name, isSingleFile) =>
    setFileLists({
      ...fileLists,
      [name]: isSingleFile
        ? [file]
        : [...(fileLists[name] ? fileLists[name] : []), file]
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
        label="A copy of the business accounts (or a copy of the business Self Assessment tax return if applicable to your business) for the year 2018/19. If this is not available as the business is less than 1 year old, please provide what is available"
        name="file_upload"
        fileList={fileLists['file_upload']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
      />
      <FileUpload
        label="Evidence of ongoing fixed property cost (a copy of the business lease, rental agreement, mortgage statement, or licence for the business premises)"
        name="file_upload2"
        fileList={fileLists['file_upload2']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
      />
      <FileUpload
        label="A copy of the business management accounts (including profit and loss account, turnover, balance sheet, and cash flow summary) for the last 12 months up to the grant application date"
        name="file_upload3"
        fileList={fileLists['file_upload3']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
      />
      <FileUpload
        label="6 months up to date bank statements for the business showing the name, address and account details. Relevant fixed property costs and employee salaries paid should be highlighted"
        name="file_upload4"
        fileList={fileLists['file_upload4']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
      />
      <FileUpload
        label="One form of identity for the named applicant (passport or driving licence)"
        name="file_upload5"
        fileList={fileLists['file_upload5']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        isSingleFile
      />
      <FileUpload
        label="Company payroll information for the last 6 months showing the number of people employed and paid by the business (if available)"
        name="file_upload6"
        fileList={fileLists['file_upload6']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
      />
      <FileUpload
        label="Completed State Aid declaration."
        name="file_upload7"
        fileList={fileLists['file_upload7']}
        onFileUploaded={handleFileUploaded}
        onFileDelete={handleFileDelete}
        isSingleFile
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default SupplementaryInformation;
