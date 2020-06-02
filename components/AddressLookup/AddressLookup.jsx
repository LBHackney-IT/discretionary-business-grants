import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import isPostcodeValid from 'uk-postcode-validator';

import { Button, Select, TextInput } from 'components/Form';
import { lookupPostcode } from 'utils/postcodeAPI';

const AddressBox = ({ name, disabled, register }) => (
  <>
    <TextInput
      label="Line1"
      name={`${name}.line1`}
      register={register({ required: true })}
      disabled={disabled}
    />
    <TextInput
      label="Line2"
      name={`${name}.line2`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Line3"
      name={`${name}.line3`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Postcode"
      name={`${name}.postcode`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Town"
      name={`${name}.town`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label=""
      name={`${name}.uprn`}
      register={register}
      type="hidden"
    />
  </>
);

const AddressLookup = ({ name, label, control, register, defaultValue }) => {
  const [postcode, setPostcode] = useState(
    defaultValue && defaultValue.postcode
  );
  const [results, setResults] = useState([]);
  const [isManually, setIsManually] = useState();
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
              ref={register({ required: !isManually })}
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
          <AddressBox name={name} disabled={!isManually} register={register} />
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
                rules={{ required: true, validate: value => value !== '' }}
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
