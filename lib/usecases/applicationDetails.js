import getDb from '../gateways/db';

export default async ({ clientGeneratedId }) => {
  const db = await getDb.getInstance();
  const query = `SELECT
                  -- grant_application
                  -- ga.id,
                  ga.client_generated_id,
                  ga.date_time_recorded,
                  --eligibility_criteria
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
                  ca.uprn,
                  ca.first_line,
                  ca.second_line,
                  ca.third_line,
                  ca.postcode,
                  ca.ward,
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
                  ba.uprn,
                  ba.first_line,
                  ba.second_line,
                  ba.third_line,
                  ba.postcode,
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
  const application = await db.one(query, [clientGeneratedId]);

  const booleanToYesNo = booleanValue => (booleanValue === true ? 'Yes' : 'No');

  return {
    application: {
      clientGeneratedId,
      applicationDate: new Date(application.date_time_recorded).toISOString(),
      stateId: application.application_state_id,
      eligibilityCriteria: {
        tradingInHackney: booleanToYesNo(application.trading_in_hackney),
        businessSizeId: application.business_size_id,
        typeOfBusinessId: application.business_type_id,
        tradingOn20200311: booleanToYesNo(application.trading_on_20200311),
        servedLegalNotices: booleanToYesNo(application.served_legal_notices),
        receivedOtherGrants: booleanToYesNo(application.received_other_grants),
        hasFixedPropertyCost: booleanToYesNo(
          application.has_fixed_property_cost
        ),
        significantIncomeFall: booleanToYesNo(
          application.significant_income_fall
        ),
        rateableLimitAnswerId: application.rateable_limit_answer_id
      }
    }
  };
};
