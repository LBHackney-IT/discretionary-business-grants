import { useForm } from 'react-hook-form';

import fileUploader from 'utils/fileUpload';
import { Button } from 'components/Form';

const Uploader = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const onSubmit = async formData => {
    const fileKey = await fileUploader(formData.fileInput[0], 'test');
    console.log(fileKey);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Test upload file</h1>
      <p>
        <input type="file" id="file" name="fileInput" ref={register} />
      </p>
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Uploader;
