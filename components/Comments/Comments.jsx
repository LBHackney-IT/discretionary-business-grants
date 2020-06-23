import PropTypes from 'prop-types';

import CommentsList from './List';

const Comments = ({ applicationId, status }) => (
  <div className="govuk-!-margin-top-9">
    <CommentsList applicationId={applicationId} status={status} />
  </div>
);

Comments.propTypes = {
  applicationId: PropTypes.string.isRequired
};

export default Comments;
