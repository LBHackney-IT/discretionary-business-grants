import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Select } from 'components/Form';
import { APPLICATION_STATE } from 'lib/dbMapping';

const ApplicationStateSelector = ({ status, applicationId }) => {
  const [error, setError] = useState();
  const [value, setValue] = useState(status);
  const handleOnChange = useCallback(async status => {
    if (!value) {
      return null;
    }
    setError(false);
    try {
      await axios.patch(`/api/applications/${applicationId}`, {
        status
      });
      setValue(status);
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  return (
    <>
      <Select
        name="state"
        label="State"
        options={APPLICATION_STATE}
        onChange={handleOnChange}
        value={value}
        error={error && { message: error }}
        isUnselectable={false}
      />
    </>
  );
};

ApplicationStateSelector.propTypes = {
  status: PropTypes.string.isRequired
};

export default ApplicationStateSelector;
