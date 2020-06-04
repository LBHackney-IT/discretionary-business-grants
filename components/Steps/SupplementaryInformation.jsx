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
  const handleFileUploaded = (file, name) =>
    setFileLists({
      ...fileLists,
      [name]: [...(fileLists[name] ? fileLists[name] : []), file]
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Supplementary Information</h1>
      <FileUpload
        label="A copy of the business accounts (or a copy of the business Self Assessment tax return if applicable to your business) for the year 2018/19. If this is not available as the business is less than 1 year old, please provide what is available"
        name="file_upload"
        fileList={fileLists['file_upload']}
        onFileUploaded={handleFileUploaded}
      />
      <FileUpload
        label="question 2"
        name="file_upload2"
        fileList={fileLists['file_upload2']}
        onFileUploaded={handleFileUploaded}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default SupplementaryInformation;
