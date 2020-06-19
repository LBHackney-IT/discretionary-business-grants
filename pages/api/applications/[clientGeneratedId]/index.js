import * as HttpStatus from 'http-status-codes';
import applicationDetails from '../../../../lib/usecases/applicationDetails';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const clientGeneratedId = req.query.clientGeneratedId;
      console.log(clientGeneratedId);
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

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
