import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BusinessTurnover from 'components/Steps/BusinessTurnover';
import PropertyCost from 'components/Steps/PropertyCost';
import BankDetails from 'components/Steps/BankDetails';
import Declaration from 'components/Steps/Declaration';
import Summary from 'components/Steps/Summary';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  'business-turnover': BusinessTurnover,
  'property-cost': PropertyCost,
  'supplementary-information': SupplementaryInformation,
  'bank-details': BankDetails,
  declaration: Declaration,
  summary: Summary
};

export const inputLabels = {
  eligibilityCriteria: {
    tradingInHackney: 'Is your business based in and trading in Hackney?',
    smallMicroBusiness:
      'Is your business classed as either a small or micro business?',
    tradingOn20200311: 'Was your business trading on the 11th March 2020?',
    typeOfBusiness: 'Type of business',
    servedLegalNotices:
      'Is your business in administration, insolvent or in receipt of a striking off notice?',
    receivedOtherGrants:
      'Has your business either received or is eligible for either a Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund.',
    hasFixedPropertyCost:
      'Does your business have fixed property cost of £60,000 per year or below?',
    hasFallInIncome:
      'Has your business experienced a SIGNIFICANT fall in income as a result of Covid-19?',
    rateableLimitAnswerId:
      'If you have an individual business rates account does your premises have a rateable value of £60,000 or less?'
  },
  contact: {
    authority: 'Role/position in organisation:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    emailAddress: 'Email Address:',
    telephoneNumber: 'Telephone Number:',
    address: 'Address:'
  },
  business: {
    businessName: 'Business Name:',
    businessDescription: 'Business description:',
    businessAddress: 'Business Address:',
    businessPremisesAddress: 'Business premises address:',
    businessPremisesDescription: 'Business premises description:',
    companyNumber: 'Company Number:',
    companyStructure: 'Company Structure:',
    businessRateAccountNumber: 'Business Rates Account Number (if applicable):',
    businessRegisteredCharity: 'Registered Charity (if applicable):',
    councilRentAccountNumber:
      'Council premises rent account number (if applicable):',
    numberEmployes: 'Number of Full Time Employees:',
    turnover: 'Business turnover March to May (inclusive) 2020:',
    percentageFallIncome: 'Percentage fall in income due to Covid-19:',
    businessPremises: 'Business premises rateable value (if applicable):'
  },
  turnover: {
    year1819: 'Financial Year 18/19',
    year1920: 'Financial Year 19/20'
  },
  propertyCost: {
    year1819: 'Financial Year 18/19',
    year1920: 'Financial Year 19/20',
    items: 'Items included:'
  },
  bank: {
    bankName: 'Bank Name:',
    accountHolder: 'Account Holder Name:',
    accountNumber: 'Account Number:',
    sortcode: 'Sort Code:'
  },
  declaration: {
    received:
      'I/we have received the following value of State Aid under above rule',
    isNotExceedingAidLimit:
      'I/we confirm that our state aid fund/grant does not exceed the cap under above rule',
    isAccepted:
      'I/we declare that i/we are permitted to accept the discretionary grant funding under the relevant state aid rule',
    isConfirmed: 'Tick to confirm you have read and understood the declaration'
  },
  supplementaryInformation: {
    businessAccounts: 'Business Accounts:',
    fixedPropertyCosts: 'Fixed Property costs:',
    businessManagementAccounts: 'Business Management accounts:',
    bankStatements: 'Bank Statements:',
    identity: 'Identity',
    payrollInformation: 'Payroll Information'
  }
};

export const getInputProps = (form, name, withoutPrefix) => ({
  name: withoutPrefix ? name : `${form}.${name}`,
  label: inputLabels[form][name]
});

export const stepKeys = Object.keys(steps);
