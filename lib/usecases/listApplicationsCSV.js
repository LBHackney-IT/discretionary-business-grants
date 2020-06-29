const ObjectsToCsv = require('objects-to-csv');

const listApplicationsCSV = ({ getDbInstance }) => async () => {
  const db = await getDbInstance();
  const query = `
    SELECT
      ga.client_generated_id,
      apst.description as status,
      b.business_name,
      bs.description AS business_size,
      bt.description AS business_type,
      c.first_name AS contact_first_name,
      c.last_name AS contact_last_name,
      c.email_address AS contact_email_address,
      c.telephone_number AS contact_telephone_number,
      sd.description AS business_premises_description,
      ba.postcode AS business_post_code,
      bba.bank_name,
      bba.account_holder AS bank_account_holder_name,
      bba.account_number AS bank_account_number,
      bba.account_sortcode AS bank_sort_code
    FROM
      grant_application ga
      JOIN
          application_assessment apa
          ON ga.id = apa.grant_application_id
      JOIN
          application_state apst
          ON apst.id = apa.application_state_id
      JOIN
          eligibility_criteria ec
          ON ga.id = ec.grant_application_id
      JOIN
          business_size bs
          ON bs.id = ec.business_size_id
      JOIN
          business_type bt
          ON bt.id = ec.business_type_id
      JOIN
          contact c
          ON ga.id = c.grant_application_id
      JOIN
          business b
          ON ga.id = b.grant_application_id
      JOIN
          site_description sd
          ON b.site_description_id = sd.id
      JOIN
          business_address ba
          ON ba.business_id = b.id
      JOIN
          business_bank_account bba
          ON bba.business_id = b.id
    ORDER BY
      ga.id ASC;`;
  const applications = await db.any(query);

  const results = applications.map(application => ({
    client_generated_id: application.client_generated_id,
    status: application.status,
    business_name: application.business_name,
    business_size: application.business_size,
    business_type: application.business_type,
    contact_first_name: application.contact_first_name,
    contact_last_name: application.contact_last_name,
    contact_email_address: application.contact_email_address,
    contact_telephone_number: application.contact_telephone_number,
    business_premises_description: application.business_premises_description,
    business_post_code: application.business_post_code,
    bank_name: application.bank_name,
    bank_account_holder_name: application.bank_account_holder_name,
    bank_account_number: application.bank_account_number,
    bank_sort_code: application.bank_sort_code
  }));

  const csvString = await new ObjectsToCsv(results).toString();

  return {
    csvString,
    error: null
  };
};

export default listApplicationsCSV;
