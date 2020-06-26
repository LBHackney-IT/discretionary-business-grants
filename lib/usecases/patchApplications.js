const ObjectsToCsv = require('objects-to-csv');

const patchApplications = ({ getDbInstance }) => async ({ author }) => {
  const db = await getDbInstance();
  const query = `
    WITH exported AS
    (
        UPDATE
            application_assessment
        SET
            application_state_id = 16 -- Exported for Payment
        WHERE
            application_state_id = 12 -- Panel Approved
        RETURNING grant_application_id
    ),
    noted as
    (
      INSERT INTO
          application_history (grant_application_id, date_time_recorded, user_recorded, notes)
          SELECT
              ex.grant_application_id,
              now(),
              $(user),
              'Application Exported for Payment'
          FROM
              exported ex
    )
    SELECT
        'D' AS record_type,
        ga.client_generated_id,
        bba.account_holder,
        ca.first_line AS contact_address_first_line,
        ca.second_line AS contact_address_second_line,
        ca.third_line AS contact_address_third_line,
        '' AS contact_address_fourth_line,
        ca.postcode AS contact_address_postcode,
        0.00 AS amount_to_pay,
        'B' AS payment_type,
        bba.account_sortcode,
        bba.account_number 
    FROM
        exported ex
        JOIN 
            grant_application ga
            ON ex.grant_application_id = ga.id
        JOIN
            business b 
            ON ga.id = b.grant_application_id 
        JOIN
            business_bank_account bba 
            ON bba.business_id = b.id 
        JOIN
            contact c 
            ON ga.id = c.grant_application_id 
        JOIN
            contact_address ca 
            ON ca.contact_id = c.id;`;
  const applications = await db.any(query, { user: author });

  let results = [];
  let appsCsv = '';

  if (applications && applications.length > 0) {
    results = applications.map(application => ({
      record_type: application.record_type,
      client_generated_id: application.client_generated_id,
      account_holder: application.account_holder,
      contact_address_first_line: application.contact_address_first_line,
      contact_address_second_line: application.contact_address_second_line,
      contact_address_third_line: application.contact_address_third_line,
      contact_address_fourth_line: application.contact_address_fourth_line,
      contact_address_postcode: application.contact_address_postcode,
      amount_to_pay: application.amount_to_pay,
      payment_type: application.payment_type,
      account_sortcode: application.account_sortcode,
      account_number: application.account_number
    }));

    appsCsv = await new ObjectsToCsv(results).toString(false);
  }

  const headerData = [
    {
      rectype: 'H',
      code: 'NRGRT',
      dt: dateAsDottedString(),
      rows: results.length,
      val: 0
    }
  ];
  const headerCsv = await new ObjectsToCsv(headerData).toString(false);
  const csvString = headerCsv + appsCsv;

  return {
    csvString,
    error: null
  };

  function dateAsDottedString() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
  }
};

export default patchApplications;
