import * as yup from 'yup';
import * as options from 'lib/dbMapping';

const emptyStringNumber = (v, o) => (o === '' ? 0 : v);

const applicationSchema = yup.object().shape({
  eligibilityCriteria: yup
    .object()
    .shape({
      tradingInHackney: yup
        .bool()
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
        .oneOf([true])
        .required(),
      servedLegalNotices: yup
        .bool()
        .oneOf([false])
        .required(),
      receivedOtherGrants: yup
        .bool()
        .oneOf([false])
        .required(),
      hasFixedPropertyCost: yup
        .bool()
        .oneOf([true])
        .required(),
      significantIncomeFall: yup
        .bool()
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
      telephoneNumber: yup.number().transform(emptyStringNumber),
      address: yup
        .object()
        .shape({
          firstLine: yup.string().required(),
          secondLine: yup.string(),
          thirdLine: yup.string(),
          ward: yup.string(),
          uprn: yup
            .number()
            .nullable()
            .transform(emptyStringNumber),
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
      companyNumber: yup.number(),
      ratesAccountNumber: yup.number(),
      registeredCharity: yup.number(),
      councilRentAccountNumber: yup.number(),
      fullTimeEmployees: yup.number().required(),
      percentageFallInIncome: yup.number().required(),
      rateableValue: yup.number(),
      councilTaxNumber: yup.number(),
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
            .number()
            .nullable(true)
            .required(),
          postcode: yup.string()
        })
        .required()
    })
    .required(),
  turnover: yup
    .object()
    .shape({
      turnover: yup.number().required(),
      year1819: yup.number().required(),
      year1920: yup.number().required()
    })
    .required(),
  fixedPropertyCosts: yup
    .object()
    .shape({
      year2018To2019: yup.number().required(),
      year2019To2020: yup.number().required(),
      itemsIncluded: yup.string().required()
    })
    .required(),
  documents: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          documentType: yup.string().required(),
          s3Path: yup.string().required()
        })
        .required()
    )
    .required(),
  businessBankAccount: yup
    .object()
    .shape({
      bankName: yup.string().required(),
      accountHolder: yup.string().required(),
      accountNumber: yup.number().required(),
      accountSortcode: yup
        .string()
        .min(6)
        .required()
    })
    .required(),
  declaration: yup
    .object()
    .shape({
      stateAidReceived: yup.number(),
      permittedToAcceptStateAidGrant: yup
        .bool()
        .oneOf([true])
        .required(),
      stateAidCapNotExceeded: yup
        .bool()
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
