import { useState } from 'react';

import fileUploader from 'utils/fileUpload';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import DeleteIcon from 'components/Icons/DeleteIcon';

const FileUpload = ({
  label,
  sublabel,
  hint,
  name,
  fileList = [],
  onFileUploaded,
  onFileDelete,
  uploadPrefix = 'test'
}) => {
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);
  const uploadFile = async file => {
    try {
      setUploading(true);
      setError(false);
      const fileKey = await fileUploader(file, uploadPrefix);
      onFileUploaded(fileKey, name);
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setUploading(false);
  };
  return (
    <div className="govuk-form-group">
      <label className="govuk-label govuk-label--m" htmlFor={name}>
        {label}
      </label>
      {sublabel && (
        <label className="govuk-label" htmlFor={name}>
          {sublabel}
        </label>
      )}
      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      <input
        className="govuk-file-upload"
        id={name}
        name={name}
        type="file"
        onChange={e => e.target.files[0] && uploadFile(e.target.files[0])}
        aria-describedby={hint && `${name}-hint`}
        disabled={uploading}
      />
      {fileList.length > 0 && (
        <ul className="govuk-list govuk-body govuk-!-margin-top-5">
          {fileList.map(file => (
            <li key={file}>
              {file.split('/').pop()}{' '}
              <span role="button" onClick={() => onFileDelete(file, name)}>
                <DeleteIcon />
              </span>
            </li>
          ))}
        </ul>
      )}
      {uploading && <p>Uploading...</p>}
      {error && (
        <ErrorMessage>There was a problem uploading the file.</ErrorMessage>
      )}
    </div>
  );
};

export default FileUpload;
