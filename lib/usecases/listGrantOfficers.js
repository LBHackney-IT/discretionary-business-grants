export const listGrantOfficers = ({ getDbInstance }) => async () => {
  const db = await getDbInstance();
  const query = `
    SELECT
      user_recorded
    FROM
      application_history
    ORDER BY user_recorded`;
  const grantOfficers = await db.any(query);

  return {
    grantOfficers: grantOfficers.map(grantOfficer => ({
      identifier: grantOfficer.user_recorded
    }))
  };
};
