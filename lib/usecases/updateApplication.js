import { APPLICATION_STATE } from 'lib/dbMapping';
import getDb from '../gateways/db';

export default async ({ clientGeneratedId, data }) => {
  const allowedPatchProperties = ['status'];
  for (let [key] of Object.entries(data)) {
    if (allowedPatchProperties.includes(key) === false) {
      return createResponse('Disallowed property in request');
    }
  }

  if (data.status === undefined) {
    return createResponse('No allowed properties in request');
  }

  const statusId = APPLICATION_STATE.findIndex(
    status => status === data.status
  );
  if (statusId === -1) {
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
      return createResponse('Application not found');
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
  await dbInstance.none(updateStatusQuery, [statusId, clientGeneratedId]);

  const addHistoryQuery = `
    INSERT INTO application_history(grant_application_id, user_recorded, notes)
    VALUES($1, $2, $3);`;
  await dbInstance.none(addHistoryQuery, [
    grantApplicationId,
    'system',
    `Status updated to "${data.status}"`
  ]);

  return createResponse(null);
};

const createResponse = error => {
  return {
    error
  };
};
