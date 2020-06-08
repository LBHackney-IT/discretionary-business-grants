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
      label="first line"
      name={`${name}.line1`}
      register={register({ required: true })}
    />
    <TextInput
      label="second line"
      name={`${name}.line2`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="third line"
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
      name={`${name}.ward`}
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
  const [error, setError] = useState();
  return (
    <div>
      <div
        className={cx('govuk-form-group', {
          'govuk-form-group--error': Boolean(error)
        })}
      >
        <label className="govuk-label govuk-label--m" htmlFor="postcode">
          {label}
        </label>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <input
              className={cx('govuk-input', {
                'govuk-input--error': Boolean(error)
              })}
              id="postcode"
              name={`${name}.postcode`}
              type="text"
              placeholder="Postcode"
              onChange={e => setPostcode(e.target.value)}
              defaultValue={defaultValue && defaultValue.postcode}
              ref={register({
                required:
                  !isManually &&
                  (!defaultValue || (defaultValue && !defaultValue.line1))
              })}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <Button
              onClick={async () => {
                if (!isPostcodeValid(postcode)) {
                  setError('You entered an invalid postcode.');
                  return;
                }
                setIsManually(false);
                setError(null);
                setResults([]);
                try {
                  const res = await lookupPostcode(postcode);
                  res.length === 0
                    ? setError('There was a problem with the postcode.')
                    : setResults(res);
                } catch {
                  setError('There was a problem with the postcode.');
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
        {error && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
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
