const listApplicationsCSV = ({ getDbInstance }) => async () => {
  const db = await getDbInstance();
  const query = `
    SELECT
      b.business_name,
      bs.description AS business_size,
      bt.description AS business_type,
      c.first_name AS contact_first_name,
      c.last_name AS contact_last_name,
      c.email_address AS contact_email_address,
      c.telephone_number AS contact_telephone_number,
      sd.description AS business_premises_description,
      ba.postcode AS business_post_code
    FROM
      grant_application ga
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
    ORDER BY
      ga.id ASC;`;
  const applications = await db.any(query);

  return {
    applications: applications.map(application => ({
      clientGeneratedId: application.client_generated_id,
      businessName: application.business_name,
      applicationDate: new Date(application.date_time_recorded).toISOString(),
      status: application.status
    })),
    pagination: {
      totalPages,
      currentPage,
      links: {
        firstPage: createPageURL(1),
        lastPage: createPageURL(totalPages),
        previousPage: createPageURL(currentPage - 1),
        nextPage: createPageURL(currentPage + 1)
      }
    },
    error: null
  };
};

export default listApplicationsCSV;
