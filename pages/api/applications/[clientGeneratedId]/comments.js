import * as HttpStatus from 'http-status-codes';
import AppContainer from 'containers/AppContainer';
import { APPLICATION_NOT_FOUND, NOTES_MUST_NOT_BE_EMPTY } from 'lib/constants';

import { getUserFromCookie } from 'utils/auth';

export default async (req, res) => {
  const clientGeneratedId = req.query.clientGeneratedId;
  const container = AppContainer.getInstance();

  switch (req.method) {
    case 'GET':
      try {
        const listApplicationComments = container.getListApplicationComments();
        res.setHeader('Content-Type', 'application/json');
        let commentsResponse = await listApplicationComments({
          clientGeneratedId
        });
        if (commentsResponse.error === APPLICATION_NOT_FOUND) {
          res.statusCode = HttpStatus.NOT_FOUND;
        } else {
          res.statusCode = HttpStatus.OK;
        }
        res.end(JSON.stringify(commentsResponse));
      } catch (error) {
        console.log('Application comments error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to get application comments'));
      }
      break;

    case 'POST':
      try {
        const addApplicationComment = container.getAddApplicationComment();
        res.setHeader('Content-Type', 'application/json');
        const user = getUserFromCookie(req.headers.cookie);
        let addCommentResult = await addApplicationComment({
          clientGeneratedId,
          author: `${user.name} <${user.email}>`,
          notes: req.body.notes
        });
        switch (addCommentResult.error) {
          case APPLICATION_NOT_FOUND:
            res.statusCode = HttpStatus.NOT_FOUND;
            break;
          case NOTES_MUST_NOT_BE_EMPTY:
            res.statusCode = HttpStatus.BAD_REQUEST;
            break;
          default:
            res.statusCode = HttpStatus.CREATED;
        }
        res.end(JSON.stringify(addCommentResult));
      } catch (error) {
        console.log('Add application comment error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to add application comment'));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
