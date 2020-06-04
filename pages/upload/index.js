import { useState } from 'react';
import { useForm } from 'react-hook-form';

import fileUploader from 'utils/fileUpload';
import { Button } from 'components/Form';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Uploader = props => {
  const [fileUploaded, setFileUploaded] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const onSubmit = async formData => {
    try {
      setError(false);
      setFileUploaded(false);
      const fileKey = await fileUploader(formData.fileInput[0], 'test');
      setFileUploaded(fileKey);
    } catch {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Test upload file</h1>
      <p>
        <input type="file" id="file" name="fileInput" ref={register} />
      </p>
      {error && (
        <ErrorMessage>There was a problem uploading the file.</ErrorMessage>
      )}
      {fileUploaded && (
        <p>
          File uploaded! <strong>{fileUploaded}</strong>
        </p>
      )}
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Uploader;
