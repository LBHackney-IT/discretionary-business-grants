import { useState } from 'react';

import fileUploader from 'utils/fileUpload';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const FileUpload = ({
  label,
  name,
  fileList = [],
  onFileUploaded,
  documentId = 'test'
}) => {
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);
  const uploadFile = async file => {
    try {
      setUploading(true);
      setError(false);
      const fileKey = await fileUploader(file, documentId);
      onFileUploaded(fileKey, name);
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setUploading(false);
  };
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={name}>
        {label}
      </label>
      {fileList.length > 0 && (
        <ul className="govuk-list govuk-body govuk-!-margin-top-5">
          {fileList.map(file => (
            <li key={file}>{file.split('/').pop()}</li>
          ))}
        </ul>
      )}
      {uploading && <p>Uploading...</p>}
      {error && (
        <ErrorMessage>There was a problem uploading the file.</ErrorMessage>
      )}
      <input
        className="govuk-file-upload"
        id={name}
        name={name}
        type="file"
        onChange={e => e.target.files && uploadFile(e.target.files[0])}
        disabled={uploading}
      />
    </div>
  );
};

export default FileUpload;
