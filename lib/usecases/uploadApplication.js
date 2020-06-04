import getDb from '../gateways/db';

export default async ({
  clientGeneratedId,
  eligibilityCriteria,
  contact,
  contactAddress,
  business,
  businessAddress,
  businessBankAccount,
  documents
}) => {
  try {
    const db = getDb.getInstance();

    const grantApplication = await db.one(
      `INSERT INTO grant_application
      (client_generated_id)
      VALUES ($1)
      RETURNING id
        `,
      [clientGeneratedId]
    );

    await db.one(
      `INSERT INTO eligibility_criteria
      (grant_application_id, trading_in_hackney, small_micro_business, trading_on_20200311, served_legal_notices, received_other_grants, has_fixed_property_cost, rateable_limit_answer_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        grantApplication.id,
        eligibilityCriteria.tradingInHackney,
        eligibilityCriteria.smallMicroBusiness,
        eligibilityCriteria.tradingOn20200311,
        eligibilityCriteria.servedLegalNotices,
        eligibilityCriteria.receivedOtherGrants,
        eligibilityCriteria.hasFixedPropertyCost,
        eligibilityCriteria.rateableLimitAnswerId
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
        contact.contactTypeId,
        contact.firstName,
        contact.lastName,
        contact.emailAddress,
        contact.telephoneNumber
      ]
    );

    await db.one(
      `INSERT INTO public.contact_address
      (contact_id, uprn, first_line, second_line, third_line, postcode, ward)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        contactId.id,
        contactAddress.uprn,
        contactAddress.firstLine,
        contactAddress.secondLine,
        contactAddress.thirdLine,
        contactAddress.postcode,
        contactAddress.ward
      ]
    );

    const businessId = await db.one(
      `INSERT INTO business
      (grant_application_id, company_structure_id, company_name, trading_name, company_number, nndr_account_number, full_time_employees, annual_turnover, percent_fall_in_income, rateable_value, fixed_property_cost)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `,
      [
        grantApplication.id,
        business.companyStructureId,
        business.companyName,
        business.tradingName,
        business.companyNumber,
        business.nndrAccountNumber,
        business.fullTimeEmployees,
        business.annualTurnover,
        business.percentageFallInIncome,
        business.rateableValue,
        business.fixedPropertyCost
      ]
    );

    await db.one(
      `
    INSERT INTO business_address
    (business_id, uprn, first_line, second_line, third_line, postcode)
    VALUES($1, $2, $3, $4, $5, $6)
    `,
      [
        businessId.id,
        businessAddress.uprn,
        businessAddress.firstLine,
        businessAddress.secondLine,
        businessAddress.thirdLine,
        businessAddress.postcode
      ]
    );

    await db.one(
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

    let documentPromises = [];
    for (let document of documents) {
      documentPromises.append(
        db.one(
          `INSERT INTO document_upload
          (grant_application_id, s3_path, document_type)
          VALUES($1, $2, $3)`,
          [grantApplication.id, document.s3Path, document.documentType]
        )
      );
    }

    Promise.allSettled(documentPromises).map(documentPromise => {
      if (documentPromise.status === 'rejected') {
        throw Error('A document failed to be inserted in the db');
      }
    });
  } catch (e) {
    console.log(e);
  }
};
