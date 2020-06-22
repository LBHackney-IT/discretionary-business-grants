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
    JOIN grant_application ga ON ga.id = ah.grant_application_id
  WHERE ga.client_generated_id = $(clientGeneratedId)
  ORDER BY ah.user_recorded ASC ;`;

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
