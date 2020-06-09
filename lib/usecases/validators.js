import { validate } from 'email-validator';

const VALID_BUSINESS_ID = ['1', '2', '3', '4', '5', '6', '7'];
const VALID_CONTACT_TYPE = ['1', '2', '3', '4', '5'];
const VALID_COMPANY_STRUCTURE = ['1', '2', '3', '4', '5'];
const INVALID_RATE_LIMT = '2';
const VALID_SITE_DESCRIPTION_ID = ['1', '2', '3', '4', '5', '6', '7'];
const VALID_BUSINESS_SIZE_ID = ['1', '2'];

async function isValidApplication({
  eligibilityCriteria,
  contact,
  business,
  turnover,
  businessBankAccount,
  documents,
  fixedPropertyCosts,
  declaration
}) {
  let errors = 0;
  const result = await Promise.allSettled([
    meetsEligibilityCriteria(eligibilityCriteria),
    isValidContact(contact),
    isValidContactAddress(contact.address),
    isValidBusiness(business),
    isValidTurnover(turnover),
    isValidBusinessAddress(business.businessAddress),
    isValidBusinessBankAccount(businessBankAccount),
    isValidDocuments(documents),
    hasFixedPropertyCosts(fixedPropertyCosts),
    hasValidDeclaration(declaration)
  ]);
  result.forEach(promise => {
    console.log(promise);
    if (promise.status === 'rejected' || promise.value === false) {
      console.log(promise.reason);
      errors += 1;
    }
  });
  return errors === 0;
}

async function meetsEligibilityCriteria({
  tradingInHackney,
  typeOfBusinessId,
  tradingOn20200311,
  servedLegalNotices,
  receivedOtherGrants,
  hasFixedPropertyCost,
  significantIncomeFall,
  rateableLimitAnswerId,
  businessSizeId
}) {
  return (
    tradingInHackney === true &&
    VALID_BUSINESS_ID.includes(typeOfBusinessId) &&
    tradingOn20200311 === true &&
    servedLegalNotices === true &&
    receivedOtherGrants === false &&
    hasFixedPropertyCost === true &&
    significantIncomeFall === true &&
    INVALID_RATE_LIMT !== rateableLimitAnswerId &&
    VALID_BUSINESS_SIZE_ID.includes(businessSizeId)
  );
}

async function isValidContact({
  contactTypeId,
  firstName,
  lastName,
  emailAddress,
  telephoneNumber
}) {
  return (
    firstName &&
    firstName.length >= 1 &&
    lastName &&
    lastName.length >= 1 &&
    emailAddress &&
    emailAddress.length >= 5 &&
    validate(emailAddress) &&
    // TODO: use a library for validation
    telephoneNumber &&
    telephoneNumber.length >= 5 &&
    VALID_CONTACT_TYPE.includes(contactTypeId)
  );
}

async function isValidContactAddress({ firstLine }) {
  return firstLine && firstLine.length >= 1;
}

async function isValidBusiness({
  companyStructureId,
  fullTimeEmployees,
  percentageFallInIncome,
  siteDescriptionId
}) {
  return (
    VALID_COMPANY_STRUCTURE.includes(companyStructureId) &&
    parseInt(fullTimeEmployees) >= 1 &&
    parseInt(percentageFallInIncome) >= 1 &&
    parseInt(percentageFallInIncome) <= 100 &&
    VALID_SITE_DESCRIPTION_ID.includes(siteDescriptionId)
  );
}

async function isValidTurnover({ turnover, year1819, year1920 }) {
  return Boolean(turnover && year1819 && year1920);
}

async function isValidBusinessAddress({ firstLine }) {
  return firstLine && firstLine.length >= 1;
}

async function isValidBusinessBankAccount({
  bankName,
  accountHolder,
  accountNumber,
  accountSortcode
}) {
  return (
    bankName &&
    bankName.length >= 1 &&
    accountHolder &&
    accountHolder.length >= 1 &&
    accountNumber &&
    accountNumber.length >= 1 &&
    accountSortcode &&
    accountSortcode.length >= 6
  );
}

function isValidDocument({ s3Path, documentType }) {
  return (
    s3Path && s3Path.length >= 1 && documentType && documentType.length >= 1
  );
}

async function isValidDocuments(documents) {
  return Array.isArray(documents) && documents.every(isValidDocument);
}

async function hasFixedPropertyCosts({
  year2018To2019,
  year2019To2020,
  itemsIncluded
}) {
  return Boolean(year2018To2019 && year2019To2020 && itemsIncluded);
}

async function hasValidDeclaration({
  stateAidCapNotExceeded,
  permittedToAcceptStateAidGrant,
  readUnderstoodDeclaration
}) {
  return (
    stateAidCapNotExceeded &&
    permittedToAcceptStateAidGrant &&
    readUnderstoodDeclaration
  );
}

export default isValidApplication;
