const VALID_BUSINESS_ID = ['1', '2', '3', '4', '5', '6', '7'];
const VALID_CONTACT_TYPE = ['1', '2', '3', '4', '5'];
const VALID_COMPANY_STRUCTURE = ['1', '2', '3', '4', '5'];
const INVALID_RATE_LIMT = '2';
const VALID_SITE_DESCRIPTION_ID = ['1', '2', '3', '4', '5', '6', '7'];

async function isValidApplication({
  eligibilityCriteria,
  contact,
  contactAddress,
  business,
  turnover,
  businessAddress,
  businessBankAccount,
  documents,
  fixedPropertyCosts
}) {
  let errors = 0;
  const result = await Promise.allSettled([
    meetsEligibilityCriteria(eligibilityCriteria),
    isValidContact(contact),
    isValidContactAddress(contactAddress),
    isValidBusiness(business),
    isValidTurnover(turnover),
    isValidBusinessAddress(businessAddress),
    isValidBusinessBankAccount(businessBankAccount),
    isValidDocuments(documents),
    hasFixedPropertyCosts(fixedPropertyCosts)
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
  smallMicroBusiness,
  typeOfBusinessId,
  tradingOn20200311,
  servedLegalNotices,
  receivedOtherGrants,
  hasFixedPropertyCost,
  significantIncomeFall,
  rateableLimitAnswerId
}) {
  return (
    tradingInHackney === true &&
    smallMicroBusiness === true &&
    VALID_BUSINESS_ID.includes(typeOfBusinessId) &&
    tradingOn20200311 === true &&
    servedLegalNotices === false &&
    receivedOtherGrants === false &&
    hasFixedPropertyCost === false &&
    significantIncomeFall === true &&
    INVALID_RATE_LIMT !== rateableLimitAnswerId
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
    // TODO: use a library for validation
    emailAddress &&
    emailAddress.length >= 5 &&
    // TODO: use a libray for validation
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
  percentFallInIncome,
  siteDescriptionId
}) {
  return (
    VALID_COMPANY_STRUCTURE.includes(companyStructureId) &&
    fullTimeEmployees >= 1 &&
    percentFallInIncome >= 1 &&
    percentFallInIncome <= 100 &&
    VALID_SITE_DESCRIPTION_ID.includes(siteDescriptionId)
  );
}

async function isValidTurnover({ year1819, year1920 }) {
  return Boolean(year1819 && year1920);
}

async function isValidBusinessAddress({ uprn, firstLine, postcode }) {
  return (
    uprn &&
    uprn.length >= 1 &&
    firstLine &&
    firstLine.length >= 1 &&
    postcode &&
    postcode.length >= 2
  );
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
  return s3Path && s3Path.length >= 1 && documentType && documentType >= 1;
}

async function isValidDocuments({ documents }) {
  return Array.isArray(documents) && documents.every(isValidDocument);
}

async function hasFixedPropertyCosts({
  year2018To2019,
  year2019To2020,
  itemsIncluded
}) {
  return Boolean(year2018To2019 && year2019To2020 && itemsIncluded);
}

export default isValidApplication;
