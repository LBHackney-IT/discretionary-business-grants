import { APPLICATION_NOT_FOUND } from '../constants';

export const NOTES_MUST_NOT_BE_EMPTY = 'Notes must not be empty';

export const addApplicationComment = ({ getDbInstance }) => async ({
  clientGeneratedId,
  author,
  notes
}) => {
  if (!notes) {
    return createErrorResponse(NOTES_MUST_NOT_BE_EMPTY);
  }
  notes = notes.trim();
  if (notes.length === 0) {
    return createErrorResponse(NOTES_MUST_NOT_BE_EMPTY);
  }

  const dbInstance = await getDbInstance();
  try {
    const checkApplicationExistsQuery = `
      SELECT
        ga.id
      FROM
        grant_application ga
      WHERE
        ga.client_generated_id = $(clientGeneratedId);`;
    await dbInstance.one(checkApplicationExistsQuery, { clientGeneratedId });
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

  const addCommentQuery = `
    INSERT INTO application_history (
      grant_application_id,
      user_recorded,
      notes
    ) VALUES (
      (SELECT id FROM grant_application WHERE client_generated_id = $(clientGeneratedId)),
      $(userRecorded),
      $(notes)
    );`;

  await dbInstance.none(addCommentQuery, {
    clientGeneratedId,
    userRecorded: author,
    notes
  });

  return {
    error: null
  };
};

const createErrorResponse = error => {
  return {
    comments: null,
    error
  };
};
