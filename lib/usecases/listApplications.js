const listApplications = ({ getDbInstance }) => async ({
  currentPage,
  pageSize,
  sort
}) => {
  currentPage = currentPage || 1;
  pageSize = pageSize || 10;
  sort = sort || '+applicationDate';

  if (currentPage < 1) {
    return createErrorResponse(
      'Cannot list applications. Page must be greater than 1.'
    );
  }

  const offset = (currentPage - 1) * pageSize;
  let sortBy = 'ga.date_time_recorded';
  switch (sort.slice(1)) {
    case 'businessName':
      sortBy = 'b.business_name';
      break;
  }
  const sortDirection = sort.slice(0, 1) === '-' ? 'DESC' : 'ASC';

  const db = await getDbInstance();
  const query = `SELECT
                    ga.date_time_recorded,
                    ga.client_generated_id,
                    b.business_name,
                    state.description AS status,
                    COUNT(*) OVER() AS total_applications
                  FROM
                    grant_application AS ga
                  JOIN business AS b ON
                    b.grant_application_id = ga.id
                  JOIN application_assessment AS aa ON
                    ga.id = aa.grant_application_id
                  JOIN application_state AS state ON
                    aa.application_state_id = state.id
                  ORDER BY ${sortBy} ${sortDirection}
                  LIMIT $(pageSize) OFFSET $(offset);`;
  console.log({
    query,
    pageSize,
    offset,
    sortBy,
    sortDirection
  });
  const applications = await db.any(query, {
    pageSize,
    offset,
    sortBy,
    sortDirection
  });

  const totalPages = calculateTotalPages();

  if (totalPages === 0 && currentPage > 1) {
    return createErrorResponse(
      'Cannot list applications. It appears that you have paginated beyond the end.'
    );
  }

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

  function calculateTotalPages() {
    let totalPages = 0;
    if (applications.length > 0) {
      totalPages = Math.ceil(applications[0].total_applications / pageSize);
    }
    return totalPages;
  }

  function createPageURL(page) {
    if (page < 1) {
      return null;
    }
    return `/api/applications?page=${page}&pageSize=${pageSize}`;
  }

  function createErrorResponse(error) {
    return {
      applications: null,
      pagination: null,
      error
    };
  }
};

export default listApplications;
