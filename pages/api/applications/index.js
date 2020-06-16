import * as HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';
import listApplications from '../../../lib/usecases/listApplications';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        const page = (req.query && req.query.page) || 1;
        const pageSize = (req.query && req.query.pageSize) || 10;
        res.end(JSON.stringify(await listApplications({ page, pageSize })));
      } catch (error) {
        console.log('Application list error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to list applications'));
      }
      break;

    case 'POST':
      try {
        const clientGeneratedId = nanoid();
        const validApplication = await isValidApplication(req.body);
        await uploadApplication({ ...validApplication, clientGeneratedId });
        await sendConfirmationEmail(
          clientGeneratedId,
          req.body.contact.emailAddress
        );
        res.statusCode = HttpStatus.CREATED;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(clientGeneratedId));
      } catch (error) {
        console.log('Application submission error:', error, 'request:', req);
        // Todo: We should 400 on invalid application and 500 on Internal Server Error
        res.statusCode = HttpStatus.BAD_REQUEST;
        res.end(JSON.stringify(error.message));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
