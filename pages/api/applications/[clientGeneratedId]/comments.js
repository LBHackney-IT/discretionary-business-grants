import * as HttpStatus from 'http-status-codes';
import { listApplicationComments } from '../../../../../lib/usecases/listApplicationComments';

export default async (req, res) => {
  const clientGeneratedId = req.query.clientGeneratedId;

  switch (req.method) {
    case 'GET':
      try {
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify(await listApplicationComments({ clientGeneratedId }))
        );
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
