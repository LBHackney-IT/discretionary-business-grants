const listApplicationComments = ({ getDbInstance }) => async ({
  clientGeneratedId
}) => {
  const db = await getDbInstance();
  const query = `
  SELECT
    ah.date_time_recorded,
    ah.user_recorded,
    ah.notes
  FROM application_history ah
    JOIN grant_application ga on ga.id = ah.grant_application_id 
  WHERE grant_application.client_generated_id = $(sortBy)
  ORDER BY ah.user_recorded DESC ;`;

  const comments = await db.any(query, {
    clientGeneratedId
  });

  return {
    comments: comments.map(comment => ({
      userRecorded: comment.user_recorded,
      notes: comment.notes,
      dateTimeRecorded: new Date(comment.date_time_recorded).toISOString()
    })),
    error: null
  };
};

export default listApplicationComments;
