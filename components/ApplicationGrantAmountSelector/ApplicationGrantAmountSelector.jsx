import { useState, useCallback } from 'react';

import { Select } from 'components/Form';
import { GRANT_AMOUNT } from 'lib/dbMapping';
import { patchApplication } from 'utils/api/applications';

const ApplicationGrantAmountSelector = ({
  grantAmountAwarded,
  onChange,
  applicationId
}) => {
  const [error, setError] = useState();
  const [value, setValue] = useState(grantAmountAwarded);
  const handleOnChange = useCallback(async grantAmountAwarded => {
    if (!value) {
      console.log('Return null');
      return null;
    }
    setError(false);
    try {
      await patchApplication(applicationId, { grantAmountAwarded });
      setValue(grantAmountAwarded);
      onChange(grantAmountAwarded);
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  return (
    <>
      <Select
        name="grantAmountAwarded"
        label="Grant Amount Awarded"
        options={GRANT_AMOUNT}
        onChange={handleOnChange}
        value={value}
        error={error && { message: error }}
        isUnselectable={false}
      />
    </>
  );
};

export default ApplicationGrantAmountSelector;
