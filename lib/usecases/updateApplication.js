import { APPLICATION_STATE } from 'lib/dbMapping';
import getDb from '../gateways/db';
import { APPLICATION_NOT_FOUND } from '../constants';

export default async ({ clientGeneratedId, data, user }) => {
  const allowedPatchProperties = ['status'];
  for (let [key] of Object.entries(data)) {
    if (allowedPatchProperties.includes(key) === false) {
      return createResponse('Disallowed property in request');
    }
  }

  if (data.status === undefined) {
    return createResponse('No allowed properties in request');
  }

  const statusIndex = APPLICATION_STATE.findIndex(
    status => status === data.status
  );
  if (statusIndex === -1) {
    return createResponse('Invalid status submitted');
  }

  const dbInstance = await getDb.getInstance();

  let grantApplicationId;
  try {
    const applicationIdQuery = `
      SELECT ga.id
      FROM grant_application ga
      WHERE ga.client_generated_id = $1;`;
    const applicationIdResult = await dbInstance.one(applicationIdQuery, [
      clientGeneratedId
    ]);
    grantApplicationId = applicationIdResult.id;
  } catch (error) {
    if (
      error.name === 'QueryResultError' &&
      // queryResultErrorCode.noData is 0, see https://github.com/vitaly-t/pg-promise/blob/master/lib/errors/query-result-error.js
      error.code === 0
    ) {
      return createResponse(APPLICATION_NOT_FOUND);
    }
    throw error;
  }

  const updateStatusQuery = `
    INSERT INTO application_assessment(grant_application_id, application_state_id)
    SELECT id, $1
    FROM grant_application
    WHERE client_generated_id = $2
    ON CONFLICT (grant_application_id)
    DO UPDATE
    SET application_state_id = $1;`;
  await dbInstance.none(updateStatusQuery, [
    statusIndex + 1,
    clientGeneratedId
  ]);

  const addHistoryQuery = `
    INSERT INTO application_history(grant_application_id, user_recorded, notes)
    VALUES($(grantApplicationId), $(user), $(notes));`;
  await dbInstance.none(addHistoryQuery, {
    grantApplicationId,
    user,
    notes: `Status updated to "${data.status}"`
  });

  return createResponse(null);
};

const createResponse = error => {
  return {
    error
  };
};
