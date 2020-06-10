import getDb from '../gateways/db';
import * as options from 'lib/dbMapping';

export default async ({
  clientGeneratedId,
  eligibilityCriteria,
  contact,
  business,
  fixedPropertyCosts,
  supplementaryInformation,
  businessBankAccount,
  declaration,
  turnover
}) => {
  const db = await getDb.getInstance();
  const grantApplication = await db.one(
    `INSERT INTO grant_application
      (client_generated_id)
      VALUES ($1)
      RETURNING id
        `,
    [clientGeneratedId]
  );

  await db.none(
    `INSERT INTO eligibility_criteria
      (grant_application_id, trading_in_hackney, business_size_id, business_type_id, trading_on_20200311, served_legal_notices, received_other_grants, has_fixed_property_cost, rateable_limit_answer_id, significant_income_fall)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      grantApplication.id,
      eligibilityCriteria.tradingInHackney,
      options.BUSINESS_SIZE.indexOf(eligibilityCriteria.businessSizeId) + 1,
      options.TYPE_OF_BUSINESS.indexOf(eligibilityCriteria.typeOfBusinessId) +
        1,
      eligibilityCriteria.tradingOn20200311,
      eligibilityCriteria.servedLegalNotices,
      eligibilityCriteria.receivedOtherGrants,
      eligibilityCriteria.hasFixedPropertyCost,
      options.RETEABLE_LIMIT_ANSWER.indexOf(
        eligibilityCriteria.rateableLimitAnswerId
      ) + 1,
      eligibilityCriteria.significantIncomeFall
    ]
  );

  const contactId = await db.one(
    `INSERT INTO contact
      (grant_application_id, contact_type_id, first_name, last_name, email_address, telephone_number)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id
    `,
    [
      grantApplication.id,
      options.CONTACT_TYPE.indexOf(contact.contactTypeId) + 1,
      contact.firstName,
      contact.lastName,
      contact.emailAddress,
      contact.telephoneNumber
    ]
  );

  await db.none(
    `INSERT INTO public.contact_address
      (contact_id, uprn, first_line, second_line, third_line, postcode, ward)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      contactId.id,
      contact.address.uprn,
      contact.address.firstLine,
      contact.address.secondLine,
      contact.address.thirdLine,
      contact.address.postcode,
      contact.address.ward
    ]
  );

  const businessId = await db.one(
    `INSERT INTO business
    (grant_application_id, company_structure_id, registered_name, business_name, description, company_number, site_description_id, full_time_employees, percent_fall_in_income, rateable_value, rates_account_number, registered_charity, council_rent_account_number, turnover_march_may_2020, turnover_2018_2019, turnover_2019_2020, fixed_property_cost, fixed_property_costs_2018_2019, fixed_property_costs_2019_2020, fixed_property_costs_items, council_tax_number)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
    RETURNING id
  `,
    [
      grantApplication.id,
      options.COMPANY_STRUCTURE.indexOf(business.companyStructureId) + 1,
      business.registeredName,
      business.businessName,
      business.businessDescription,
      business.companyNumber,
      options.SITE_DESCRIPTION.indexOf(business.siteDescriptionId) + 1,
      business.fullTimeEmployees,
      business.percentageFallInIncome,
      business.rateableValue,
      business.ratesAccountNumber,
      business.registeredCharity,
      business.councilRentAccountNumber,
      turnover.turnover,
      turnover.year1819,
      turnover.year1920,
      business.fixedPropertyCost,
      fixedPropertyCosts.year2018To2019,
      fixedPropertyCosts.year2019To2020,
      fixedPropertyCosts.itemsIncluded,
      business.councilTaxNumber
    ]
  );

  await db.none(
    `
    INSERT INTO business_address
    (business_id, uprn, first_line, second_line, third_line, postcode)
    VALUES($1, $2, $3, $4, $5, $6)
    `,
    [
      businessId.id,
      business.businessAddress.uprn,
      business.businessAddress.firstLine,
      business.businessAddress.secondLine,
      business.businessAddress.thirdLine,
      business.businessAddress.postcode
    ]
  );

  await db.none(
    `INSERT INTO business_bank_account
      (business_id, bank_name, account_holder, account_number, account_sortcode)
      VALUES($1, $2, $3, $4, $5)`,
    [
      businessId.id,
      businessBankAccount.bankName,
      businessBankAccount.accountHolder,
      businessBankAccount.accountNumber,
      businessBankAccount.accountSortcode
    ]
  );

  await db.none(
    `INSERT INTO declaration
     (grant_application_id, state_aid_received, state_aid_cap_not_exceeded, permitted_to_accept_state_aid_grant, read_understood_declaration)
     VALUES($1, $2, $3, $4, $5)`,
    [
      grantApplication.id,
      declaration.stateAidReceived,
      declaration.stateAidCapNotExceeded,
      declaration.permittedToAcceptStateAidGrant,
      declaration.readUnderstoodDeclaration
    ]
  );

  const documentPromises = Object.entries(supplementaryInformation).reduce(
    (acc, [fileType, value]) => [
      ...acc,
      ...value.map(file =>
        db.none(
          `INSERT INTO document_upload
          (grant_application_id, s3_path, document_type)
          VALUES($1, $2, $3)`,
          [grantApplication.id, file, fileType]
        )
      )
    ],
    []
  );

  const documentInsertResults = await Promise.allSettled(documentPromises);
  for (const promiseResult in documentInsertResults) {
    if (promiseResult.status === 'rejected') {
      throw Error('A document failed to be inserted in the db');
    }
  }
};
