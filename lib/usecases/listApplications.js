import getDb from '../gateways/db';

export default async options => {
  const db = await getDb.getInstance();
  const limit = options.pageSize;
  const offset = (options.page - 1) * limit;
  const query = `SELECT ga.date_time_recorded, ga.client_generated_id, b.business_name , 'Unprocessed' AS status
                FROM grant_application AS ga
                JOIN business AS b ON b.grant_application_id = ga.id
                ORDER BY ga.id DESC
                LIMIT $1 OFFSET $2;`;
  const applications = await db.any(query, [offset, limit]);
  console.log(applications);
  return {
    applications: applications.map(application => ({
      clientGeneratedId: application.client_generated_id,
      businessName: application.business_name,
      applicationDate: application.date_time_recorded.toISOString(),
      status: application.status
    })),
    pagination: {
      totalPages: 999,
      currentPage: 123,
      links: {
        firstPage: 'first-page-link-tbc',
        lastPage: 'last-page-link-tbc',
        previousPage: 'previous-page-link-tbc',
        nextPage: 'next-page-link-tbc'
      },
      error: null
    }
  };
};
