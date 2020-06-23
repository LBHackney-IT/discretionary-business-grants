import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const CommentList = ({ applicationId }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const fetchData = useCallback(async () => {
    if (!applicationId) {
      return null;
    }
    setError(false);
    try {
      const { data } = await axios.get(
        `/api/applications/${applicationId}/comments`
      );
      setData(data.comments);
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2 className="govuk-heading-l">Comments</h2>
      {data &&
        data.length > 0 &&
        data.map(comment => (
          <div key={comment.dateTimeRecorded}>
            <div className="govuk-heading-s">
              {comment.userRecorded}
              <span className="govuk-caption-m">
                {new Date(comment.dateTimeRecorded).toLocaleString()}
              </span>
            </div>
            <div>{comment.notes}</div>
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          </div>
        ))}
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

CommentList.propTypes = {
  applicationId: PropTypes.string.isRequired
};

export default CommentList;
