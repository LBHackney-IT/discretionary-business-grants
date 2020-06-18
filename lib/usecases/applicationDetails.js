import getDb from '../gateways/db';
import {
  APPLICATION_STATE,
  BUSINESS_SIZE,
  COMPANY_STRUCTURE,
  CONTACT_TYPE,
  SITE_DESCRIPTION,
  STATE_AID_OPTION,
  TYPE_OF_BUSINESS
} from 'lib/dbMapping';

export default async ({ clientGeneratedId }) => {
  const dbInstance = await getDb.getInstance();
  const application = await getApplicationData(dbInstance, clientGeneratedId);
  const uploadedDocuments = await getDocuments(dbInstance, clientGeneratedId);
  // Todo: 404 on application not found.
  return {
    application: {
      clientGeneratedId,
      applicationDate: new Date(application.date_time_recorded).toISOString(),
      state: APPLICATION_STATE[application.application_state_id - 1],
      eligibilityCriteria: {
        tradingInHackney: booleanToYesNo(application.trading_in_hackney),
        businessSizeId: BUSINESS_SIZE[application.business_size_id - 1],
        typeOfBusinessId: TYPE_OF_BUSINESS[application.business_type_id - 1],
        tradingOn20200311: booleanToYesNo(application.trading_on_20200311),
        servedLegalNotices: booleanToYesNo(application.served_legal_notices),
        receivedOtherGrants: booleanToYesNo(application.received_other_grants),
        hasFixedPropertyCost: booleanToYesNo(
          application.has_fixed_property_cost
        ),
        significantIncomeFall: booleanToYesNo(
          application.significant_income_fall
        )
      },
      contact: {
        contactTypeId: CONTACT_TYPE[application.contact_type_id - 1],
        firstName: application.first_name,
        lastName: application.last_name,
        emailAddress: application.email_address,
        telephoneNumber: application.telephone_number,
        address: {
          uprn: application.contact_address_uprn,
          firstLine: application.contact_address_first_line,
          secondLine: application.contact_address_second_line,
          thirdLine: application.contact_address_third_line,
          postcode: application.contact_address_postcode,
          ward: application.contact_address_ward
        }
      },
      business: {
        companyStructureId:
          COMPANY_STRUCTURE[application.company_structure_id - 1],
        registeredName: application.registered_name,
        businessName: application.business_name,
        businessDescription: application.description,
        companyNumber: application.company_number,
        siteDescriptionId:
          SITE_DESCRIPTION[application.site_description_id - 1],
        fullTimeEmployees: application.full_time_employees,
        percentageFallInIncome: application.percent_fall_in_income,
        rateableValue: application.rateable_value,
        ratesAccountNumber: application.rates_account_number,
        registeredCharity: booleanToYesNo(application.registered_charity),
        councilRentAccountNumber: application.council_rent_account_number,
        councilTaxNumber: application.council_tax_number,
        businessAddress: {
          uprn: application.business_address_uprn,
          firstLine: application.business_address_first_line,
          secondLine: application.business_address_second_line,
          thirdLine: application.business_address_third_line,
          postcode: application.business_address_postcode
        }
      },
      turnover: {
        turnover: application.turnover_march_may_2020,
        year1819: application.turnover_2018_2019,
        year1920: application.turnover_2019_2020
      },
      fixedPropertyCosts: {
        year2018To2019: application.fixed_property_costs_2018_2019,
        year2019To2020: application.fixed_property_costs_2019_2020,
        itemsIncluded: application.fixed_property_costs_items
      },
      documents: uploadedDocuments,
      businessBankAccount: {
        bankName: application.bank_name,
        accountHolder: application.account_holder,
        accountNumber: application.account_number,
        accountSortcode: application.account_sortcode
      },
      declaration: {
        stateAidOptionId: STATE_AID_OPTION[application.state_aid_option_id - 1],
        dateOfAid: application.date_of_aid
          ? new Date(application.date_of_aid).toISOString()
          : null,
        organisationProvidingAid: application.organisation_providing_aid,
        stateAidReceived: booleanToYesNo(application.state_aid_received),
        permittedToAcceptStateAidGrant: booleanToYesNo(
          application.permitted_to_accept_state_aid_grant
        ),
        readUnderstoodDeclaration: booleanToYesNo(
          application.read_understood_declaration
        )
      }
    }
  };
};

const booleanToYesNo = booleanValue => (booleanValue === true ? 'Yes' : 'No');

const getApplicationData = async (dbInstance, clientGeneratedId) => {
  const query = `SELECT
                  -- grant_application
                  -- ga.id,
                  ga.client_generated_id,
                  ga.date_time_recorded,
                  -- eligibility_criteria
                  -- ec.id,
                  -- ec.grant_application_id,
                  ec.trading_in_hackney,
                  ec.trading_on_20200311,
                  ec.served_legal_notices,
                  ec.received_other_grants,
                  ec.has_fixed_property_cost,
                  ec.rateable_limit_answer_id,
                  ec.business_type_id,
                  ec.significant_income_fall,
                  ec.business_size_id,
                  -- application_assessment
                  aa.id,
                  -- aa.grant_application_id,
                  aa.application_state_id,
                  -- Beware validations is text of JSON
                  aa.validations,
                  -- contact
                  -- c.id,
                  -- c.grant_application_id,
                  c.contact_type_id,
                  c.first_name,
                  c.last_name,
                  c.email_address,
                  c.telephone_number,
                  -- contact_address
                  -- ca.id,
                  ca.contact_id,
                  ca.uprn AS contact_address_uprn,
                  ca.first_line AS contact_address_first_line,
                  ca.second_line AS contact_address_second_line,
                  ca.third_line AS contact_address_third_line,
                  ca.postcode AS contact_address_postcode,
                  -- ca.ward,
                  -- business
                  -- b.id,
                  -- b.grant_application_id,
                  b.company_structure_id,
                  b.company_number,
                  b.full_time_employees,
                  b.percent_fall_in_income,
                  b.rateable_value,
                  b.fixed_property_cost,
                  b.description,
                  b.rates_account_number,
                  b.registered_charity,
                  b.council_rent_account_number,
                  b.turnover_march_may_2020,
                  b.turnover_2018_2019,
                  b.turnover_2019_2020,
                  b.registered_name,
                  b.business_name,
                  b.site_description_id,
                  b.fixed_property_costs_2018_2019,
                  b.fixed_property_costs_2019_2020,
                  b.fixed_property_costs_items,
                  b.council_tax_number,
                  -- business_address
                  -- ba.id,
                  -- ba.business_id,
                  ba.uprn AS business_address_uprn,
                  ba.first_line AS business_address_first_line,
                  ba.second_line AS business_address_second_line,
                  ba.third_line AS business_address_third_line,
                  ba.postcode AS business_address_postcode,
                  -- business_bank_account
                  -- bba.id,
                  -- bba.business_id,
                  bba.bank_name,
                  bba.account_holder,
                  bba.account_number,
                  bba.account_sortcode,
                  -- declaration d
                  -- d.id,
                  -- d.grant_application_id,
                  d.state_aid_received,
                  d.permitted_to_accept_state_aid_grant,
                  d.read_understood_declaration,
                  d.state_aid_option_id,
                  d.date_of_aid,
                  d.organisation_providing_aid
              FROM
                  grant_application ga
                  JOIN
                      eligibility_criteria ec
                      ON ga.id = ec.grant_application_id
                  JOIN
                      application_assessment aa
                      ON ga.id = aa.grant_application_id
                  JOIN
                      contact c
                      ON ga.id = c.grant_application_id
                  JOIN
                      contact_address ca
                      ON ca.contact_id = c.id
                  JOIN
                      business b
                      ON ga.id = b.grant_application_id
                  JOIN
                      business_address ba
                      ON ba.business_id = b.id
                  JOIN
                      business_bank_account bba
                      ON bba.business_id = b.id
                  JOIN
                      declaration d
                      ON ga.id = d.grant_application_id
              WHERE
                  ga.client_generated_id = $1;`;
  return await dbInstance.one(query, [clientGeneratedId]);
};

const getDocuments = async (dbInstance, clientGeneratedId) => {
  const query = `SELECT s3_path, document_type
                  FROM grant_application AS ga
                  JOIN document_upload AS du
                      ON ga.id = du.grant_application_id
                  WHERE ga.client_generated_id = $1
                  ORDER BY du.document_type;`;
  const documentData = await dbInstance.any(query, [clientGeneratedId]);
  let documents = [];

  documents = documentData.map(row => ({
    s3Path: row.s3_path,
    documentType: row.document_type
  }));

  console.log({ docLength: documents.length });

  return documents;
};
