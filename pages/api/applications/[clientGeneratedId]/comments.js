import * as HttpStatus from 'http-status-codes';
import AppContainer from '../../../../containers/AppContainer';
import { APPLICATION_NOT_FOUND } from '../../../../lib/constants';

export default async (req, res) => {
  const clientGeneratedId = req.query.clientGeneratedId;

  switch (req.method) {
    case 'GET':
      try {
        const container = AppContainer.getInstance();
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

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
