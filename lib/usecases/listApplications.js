import getDb from '../gateways/db';

export default async ({ page, pageSize }) => {
  const db = await getDb.getInstance();
  const offset = (page - 1) * pageSize;
  const query = `SELECT ga.date_time_recorded,
                ga.client_generated_id,
                b.business_name,
                'Unprocessed' AS status,
                count(*) OVER() AS total_applications
                FROM grant_application AS ga
                JOIN business AS b ON b.grant_application_id = ga.id
                ORDER BY ga.id DESC
                LIMIT $1 OFFSET $2;`;
  const applications = await db.any(query, [pageSize, offset]);

  let totalPages = 0;
  if (applications.length > 0) {
    totalPages = Math.ceil(applications[0].total_applications / pageSize);
  }

  if (totalPages === 0 && page > 1) {
    return {
      applications: null,
      pagination: null,
      error:
        'Cannot list applications. It appears that you have paginated beyond the end.'
    };
  }

  return {
    applications: applications.map(application => ({
      clientGeneratedId: application.client_generated_id,
      businessName: application.business_name,
      applicationDate: application.date_time_recorded.toISOString(),
      status: application.status
    })),
    pagination: {
      totalPages,
      currentPage: page,
      links: {
        firstPage: createPageURL(1, pageSize),
        lastPage: createPageURL(totalPages, pageSize),
        previousPage: createPageURL(page - 1, pageSize),
        nextPage: createPageURL(page + 1, pageSize)
      },
      error: null
    }
  };

  function createPageURL(page, pageSize) {
    if (page < 1) {
      return null;
    }
    return `/api/applications?page=${page}&pageSize=${pageSize}`;
  }
};
