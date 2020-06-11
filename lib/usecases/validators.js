import * as yup from 'yup';
import * as options from 'lib/dbMapping';

yup.addMethod(yup.string, 'integer', function() {
  return this.matches(/^\d+$/, {
    message: '${path} should have digits only',
    excludeEmptyString: true
  });
});

const emptyStringNumber = (v, o) => (o === '' ? null : v);
const stringToBool = (v, o) => o === 'Yes';

const applicationSchema = yup.object().shape({
  eligibilityCriteria: yup
    .object()
    .shape({
      tradingInHackney: yup
        .bool()
        .transform(stringToBool)
        .oneOf([true])
        .required(),
      businessSizeId: yup
        .string()
        .oneOf(options.VALID_BUSINESS_SIZE)
        .required(),
      typeOfBusinessId: yup
        .string()
        .oneOf(options.TYPE_OF_BUSINESS)
        .required(),
      tradingOn20200311: yup
        .bool()
        .transform(stringToBool)
        .oneOf([true])
        .required(),
      servedLegalNotices: yup
        .bool()
        .transform(stringToBool)
        .oneOf([false])
        .required(),
      receivedOtherGrants: yup
        .bool()
        .transform(stringToBool)
        .oneOf([false])
        .required(),
      hasFixedPropertyCost: yup
        .bool()
        .transform(stringToBool)
        .oneOf([true])
        .required(),
      significantIncomeFall: yup
        .bool()
        .transform(stringToBool)
        .oneOf([true])
        .required(),
      rateableLimitAnswerId: yup
        .string()
        .oneOf(options.VALID_RETEABLE_LIMIT_ANSWER)
        .required()
    })
    .required(),
  contact: yup
    .object()
    .shape({
      contactTypeId: yup
        .string()
        .oneOf(options.CONTACT_TYPE)
        .required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      emailAddress: yup
        .string()
        .email()
        .required(),
      telephoneNumber: yup.string().integer(),
      address: yup
        .object()
        .shape({
          firstLine: yup.string().required(),
          secondLine: yup.string(),
          thirdLine: yup.string(),
          ward: yup.string(),
          uprn: yup.string().integer(),
          postcode: yup.string()
        })
        .required()
    })
    .required(),
  business: yup
    .object()
    .shape({
      companyStructureId: yup
        .string()
        .oneOf(options.COMPANY_STRUCTURE)
        .required(),
      registeredName: yup.string(),
      businessName: yup.string().required(),
      businessDescription: yup.string(),
      companyNumber: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      ratesAccountNumber: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      registeredCharity: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      councilRentAccountNumber: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      fullTimeEmployees: yup.number().required(),
      percentageFallInIncome: yup
        .number()
        .min(0)
        .max(100)
        .required(),
      rateableValue: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      councilTaxNumber: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      siteDescriptionId: yup
        .string()
        .oneOf(options.SITE_DESCRIPTION)
        .required(),
      businessAddress: yup
        .object()
        .shape({
          firstLine: yup.string().required(),
          secondLine: yup.string(),
          thirdLine: yup.string(),
          ward: yup.string(),
          uprn: yup
            .string()
            .matches(/\d+/)
            .required(),
          postcode: yup.string()
        })
        .required()
    })
    .required(),
  turnover: yup
    .object()
    .shape({
      turnover: yup
        .number()
        .integer()
        .required(),
      year1819: yup
        .number()
        .integer()
        .required(),
      year1920: yup
        .number()
        .integer()
        .required()
    })
    .required(),
  fixedPropertyCosts: yup
    .object()
    .shape({
      year2018To2019: yup
        .number()
        .integer()
        .required(),
      year2019To2020: yup
        .number()
        .integer()
        .required(),
      itemsIncluded: yup.string().required()
    })
    .required(),
  supplementaryInformation: yup
    .object()
    .shape({
      businessAccounts: yup
        .array()
        .of(yup.string().required())
        .required(),
      fixedPropertyCosts: yup
        .array()
        .of(yup.string().required())
        .required(),
      fallInIncome: yup
        .array()
        .of(yup.string().required())
        .required(),
      identity: yup
        .array()
        .of(yup.string().required())
        .required(),
      payrollInformation: yup.array().of(yup.string())
    })
    .required(),
  businessBankAccount: yup
    .object()
    .shape({
      bankName: yup.string().required(),
      accountHolder: yup.string().required(),
      accountNumber: yup
        .string()
        .min(8)
        .max(8)
        .integer()
        .required(),
      accountSortcode: yup
        .string()
        .integer()
        .min(6)
        .max(6)
        .required()
    })
    .required(),
  declaration: yup
    .object()
    .shape({
      stateAidOptionId: yup
        .string()
        .oneOf(options.STATE_AID_OPTION)
        .required(),
      dateOfAid: yup
        .string()
        .nullable(),
      organisationProvidingAid: yup
        .string()
        .nullable(),
      stateAidReceived: yup
        .number()
        .integer()
        .nullable()
        .transform(emptyStringNumber),
      permittedToAcceptStateAidGrant: yup
        .bool()
        .transform(stringToBool)
        .oneOf([true])
        .required(),
      readUnderstoodDeclaration: yup
        .bool()
        .oneOf([true])
        .required()
    })
    .required()
});

export default data => applicationSchema.validate(data);
