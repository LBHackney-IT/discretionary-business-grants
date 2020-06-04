import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BankDetails from 'components/Steps/BankDetails';
import StateAidDeclaration from 'components/Steps/StateAidDeclaration';
import Summary from 'components/Steps/Summary';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  'supplementary-information': SupplementaryInformation,
  'bank-details': BankDetails,
  'state-aid-declaration': StateAidDeclaration,
  summary: Summary
};

export const inputLabels = {
  eligibility: {
    isBasedInHackney: 'Is your business based in and trading in Hackney?',
    isSmallBusiness:
      'Is your business classed as either a small or micro business?',
    beforeDate: 'Was your business trading on the 11th March 2020?',
    isInsolvent:
      'Is your business in administration, insolvent or in receipt of a striking off notice?',
    hasReceived:
      'Has your business either received or is eligible for either a Small Business Grant or a Retail, Hospitality and Leisure Grant?',
    hasFixedPropertyCost:
      'Does your business have an annual fixed property cost (this could be annual rent, annual mortgage, annual market pitch fee, annual storage cost)?',
    hasFallInIncome:
      'Has your business experienced a fall in income of at least 30% as a result of Covid-19?',
    hasReteableValue:
      'If you have an individual business rates account does your premises have a rateable value of £60k or less?'
  },
  user: {
    authority: 'Authority:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    email: 'Email Address:',
    tel: 'Telephone Number:',
    address: 'Address:'
  },
  business: {
    businessName: 'Business Name:',
    businessAddress: 'Business Address:',
    companyNumber: 'Company Number:',
    companyStructure: 'Company Structure:',
    businessRateAccountNumber: 'Business Rates Account Number:',
    numberEmployes: 'Number of Full Time Employes:',
    percentageFallIncome: 'Percentage fall in income due to Covid-19:',
    businessPremises: 'Business premises rateable value:',
    fixedPropAnnum: 'Per Annum:',
    fixedPropItems: 'Items included:',
    wasTradingBefore: 'Was trading on 11th March 2021',
    wasIneligible:
      'Was ineligible to access funding from the Small Business Grant Fund, or Retail, Leisure and Hospitality Grant Fund'
  },
  bank: {
    bankName: 'Bank Name:',
    accountHolder: 'Account Holder Name:',
    accountNumber: 'Account Number:',
    sortcode: 'Sort Code:'
  },
  stateAidDeclaration: {
    isAuthorised: 'I am authorised to sign this declaration',
    isNotExceedingAidLimit:
      'Receipt of this grant will not exceed the state aid limit'
  }
};

export const getInputProps = (form, name) => ({
  name: `${form}.${name}`,
  label: inputLabels[form][name]
});

export const stepKeys = Object.keys(steps);
