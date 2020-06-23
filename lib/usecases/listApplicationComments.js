import { APPLICATION_NOT_FOUND } from '../constants';

const listApplicationComments = ({ getDbInstance }) => async ({
  clientGeneratedId
}) => {
  const dbInstance = await getDbInstance();
  try {
    const query = `
      SELECT
        ga.id
      FROM
        grant_application ga
      WHERE
        ga.client_generated_id = $1;`;
    await dbInstance.one(query, [clientGeneratedId]);
  } catch (error) {
    if (
      error.name === 'QueryResultError' &&
      // queryResultErrorCode.noData is 0, see https://github.com/vitaly-t/pg-promise/blob/master/lib/errors/query-result-error.js
      error.code === 0
    ) {
      return createErrorResponse(APPLICATION_NOT_FOUND);
    }
    return createErrorResponse(error.message);
  }

  const query = `
    SELECT
      ah.date_time_recorded,
      ah.user_recorded,
      ah.notes
    FROM application_history ah
      JOIN grant_application ga
        ON ga.id = ah.grant_application_id
    WHERE ga.client_generated_id = $(clientGeneratedId)
    ORDER BY ah.user_recorded ASC ;`;

  const comments = await dbInstance.any(query, {
    clientGeneratedId
  });

  // Todo: 404 on application not found

  return {
    comments: comments.map(comment => ({
      userRecorded: comment.user_recorded,
      notes: comment.notes,
      dateTimeRecorded: new Date(comment.date_time_recorded).toISOString()
    }))
  };
};

const createErrorResponse = error => {
  return {
    comments: null,
    error
  };
};

export default listApplicationComments;
