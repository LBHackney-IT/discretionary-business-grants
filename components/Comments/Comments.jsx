import PropTypes from 'prop-types';

import CommentsList from './List';

const Comments = ({ applicationId }) => (
  <div className="govuk-!-margin-top-9">
    <CommentsList applicationId={applicationId} />
  </div>
);

Comments.propTypes = {
  applicationId: PropTypes.string.isRequired
};

export default Comments;
