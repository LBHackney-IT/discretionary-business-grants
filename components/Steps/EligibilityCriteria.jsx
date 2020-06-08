import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

const Step1 = props => {
  const { register, handleSubmit } = useForm({ defaultValues: props.formData });
  const [showError, setShowError] = useState(false);
  const onSubmit = data => {
    const hasSomeDeclines = Object.entries(data.eligibilityCriteria).some(
      ([key, value]) =>
        (value === 'No' && key !== 'receivedOtherGrants') ||
        (value === 'Yes' && key === 'receivedOtherGrants')
    );
    setShowError(hasSomeDeclines);
    if (!hasSomeDeclines) {
      props.saveData(data);
      Router.push(stepPath, props.nextStep);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="step-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Eligibility Criteria</h1>
          </legend>
          <span id="step-hint" className="govuk-hint">
            Applicants must meet all the eligibility questions to proceed to the
            next section
          </span>
          <Radios
            {...getInputProps('eligibilityCriteria', 'tradingInHackney')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'smallMicroBusiness')}
            hint="Small and micro businesses only as defined in the Companies Act 2006. To be defined as a small business they must have at least two of the following; not more than 50 employees, a turnover of not more than £10.2 million and a balance sheet total of not more than £5.1m. To be defined as a microbusinesses they must have at least two of the following; not more than 10 employees, a turnover of not more than £632,000, and a balance sheet total of not more than £316,000."
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Select
            {...getInputProps('eligibilityCriteria', 'typeOfBusiness')}
            hint="Types of businesses eligible: 1) Small and micro businesses in shared offices or workspaces without their own business rates assessment (offices or workspaces in domestic dwellings are not classed as shared offices or shared workspace, to be eligible the business must be using a commercial space where an all-inclusive rent, license or similar fee is paid and occupy this space on a regular basis as their primary business premises). 2) Small and micro businesses in the retail, hospitality and leisure sector with a rateable value of between £51,000-£60,000 (inclusive) and who have therefore been unable to benefit from the existing Retail, Hospitality and Leisure Grant: the business must be a Retail, Hospitality or Leisure business identified in the Retail, Hospitality and Leisure Grant Fund. 3) Small and micro businesses whose income and turnover is directly related to the Retail, Hospitality and Leisure sector: businesses must demonstrate clearly in their application how their business is related to the Retail, Hospitality and Leisure sector. Those businesses in the Retail, Hospitality and Leisure sector are identified in the Retail, Hospitality and Leisure Grant Fund.Regular market traders with fixed building costs who do not have their own business rates assessment: 4) A regular market trader is defined as a market trader with a permanent licence who trades 5 or more days per week in the London Borough of Hackney. A fixed building cost for a market trader includes ongoing pitch fees and storage fees.  5) Bed & Breakfasts who pay Council Tax instead of business rates and who provide visitor accommodation on a per night basis including at least one meal per day (not ‘Air B&B’ style accommodation, Houses in Multiple Occupation, or other forms of short term lets),. 6)Charity properties who occupy a commercial property with a rateable value of £15,000 or less and who are in receipt of charitable business rates relief which would otherwise have been eligible for Small Business Rates Relief or Rural Rate Relief. 7)Ofsted registered nurseries (not within a domestic premises)."
            options={[
              'Business in shared offices or workspaces without business rates assessment',
              'Business in RHL sector with a rateable value of between £51,000-£60,000 ',
              'Business whose income is directly related to RHL sector',
              'Regular market trader with fixed building costs',
              'Bed & Breakfast who pay Council Tax',
              'Charity properties who occupy a commercial property with a rateable value of £15,000 or less',
              'Ofsted registered nurseries (not within a domestic premises)'
            ]}
            register={register({
              required: true,
              validate: value => value !== ''
            })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'tradingOn20200311')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'servedLegalNotices')}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'receivedOtherGrants')}
            hint="Businesses must not be eligible for the existing Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund to be considered for this grant"
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'hasFixedPropertyCost')}
            hint="A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader) that is at least 30% of the annual business turnover."
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'hasFallInIncome')}
            hint="A ‘significant fall in income’ is defined as a fall in income of at least a 40% reduction in business turnover from March 2020 onwards compared to the previous 3 months."
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
          <Radios
            {...getInputProps('eligibilityCriteria', 'rateableLimitAnswerId')}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
              { label: 'Not Applicable', value: 'Not Applicable' }
            ]}
            onChange={() => setShowError(false)}
            register={register({ required: true })}
          />
        </fieldset>
      </div>
      {showError && (
        <ErrorSummary
          title="Unfortunately you are not eligible for this grant."
          body="The information provided does not meet the specified requirements."
        />
      )}
      {!showError && (
        <Button className="govuk-button" text="Next" type="submit" />
      )}
    </form>
  );
};

export default Step1;
