import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const UploadedDocument = ({ type = 'click me', url }) => {
  const [error, setError] = useState();
  return (
    <>
      <button
        onClick={async () => {
          try {
            const { data } = await axios.get('tbd', { url });
            window.open(data.url, '_blank');
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        {type}
      </button>
      {error && <ErrorMessage text={error} />}
    </>
  );
};

UploadedDocument.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default UploadedDocument;
