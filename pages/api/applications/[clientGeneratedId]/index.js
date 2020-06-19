import * as HttpStatus from 'http-status-codes';
import applicationDetails from '../../../../lib/usecases/updateApplication';
import updateApplication from '../../../../lib/usecases/updateApplication';

export default async (req, res) => {
  const clientGeneratedId = req.query.clientGeneratedId;

  switch (req.method) {
    case 'GET':
      try {
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify(await applicationDetails({ clientGeneratedId }))
        );
      } catch (error) {
        console.log('Application details error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to get application details'));
      }
      break;

    case 'PATCH':
      try {
        res.statusCode = HttpStatus.CREATED;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify(
            await updateApplication({ clientGeneratedId, data: req.body })
          )
        );
      } catch (error) {
        console.log('Application patch error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to patch application'));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
