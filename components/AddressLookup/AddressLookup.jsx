import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import isPostcodeValid from 'uk-postcode-validator';

import { Button, Select, TextInput } from 'components/Form';
import { lookupPostcode, normalizeAddress } from 'utils/postcodeAPI';

const AddressText = props => (
  <TextInput
    {...props}
    value={
      typeof props.value === 'string'
        ? props.value
        : props.value && normalizeAddress(props.value).addressText
    }
  />
);

const AddressLookup = ({ name, label, control, defaultValue }) => {
  const [postcode, setPostcode] = useState(
    defaultValue && defaultValue.postcode
  );
  const [results, setResults] = useState([]);
  const [isManually, setIsManually] = useState(
    typeof defaultValue === 'string'
  );
  const [hasError, setHasError] = useState(false);
  return (
    <div>
      <div
        className={cx('govuk-form-group', {
          'govuk-form-group--error': hasError
        })}
      >
        <label className="govuk-label" htmlFor="postcode">
          Postcode:
        </label>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <input
              className={cx('govuk-input', { 'govuk-input--error': hasError })}
              id="postcode"
              name="postcode"
              type="text"
              onChange={e => setPostcode(e.target.value)}
              defaultValue={defaultValue && defaultValue.postcode}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <Button
              onClick={async () => {
                if (!isPostcodeValid(postcode)) {
                  setHasError(true);
                  return;
                }
                setIsManually(false);
                setHasError(false);
                setResults([]);
                try {
                  const res = await lookupPostcode(postcode);
                  setResults(res);
                } catch {
                  setHasError(true);
                }
              }}
              type="button"
              text="lookup"
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <Button
              onClick={() => {
                setIsManually(true);
              }}
              isSecondary
              type="button"
              text="or enter it manually"
            />
          </div>
        </div>
        {hasError && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> There was a
            problem with the postcode.
          </span>
        )}
        {(isManually || (defaultValue && results.length === 0)) && (
          <Controller
            as={AddressText}
            control={control}
            label={label}
            name={name}
            type="text"
            onChange={([value]) => value}
            disabled={!isManually}
            rules={{ required: true }}
          />
        )}
        {!isManually && results.length > 0 && (
          <Controller
            as={
              <Select
                options={results.map(result => ({
                  value: JSON.stringify(result.address),
                  text: result.addressText
                }))}
                name={name}
                label={label}
                rules={{ required: true }}
              />
            }
            control={control}
            name={name}
            onChange={([value]) => JSON.parse(value)}
          />
        )}
      </div>
    </div>
  );
};

AddressLookup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default AddressLookup;
