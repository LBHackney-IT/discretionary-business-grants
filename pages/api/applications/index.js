import * as HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import AppContainer from '../../../containers/AppContainer';
import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const container = AppContainer.getInstance();
        const listApplications = container.getListApplications();
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        const currentPage = parseInt((req.query && req.query.page) || 1, 10);
        const pageSize = parseInt((req.query && req.query.pageSize) || 10, 10);
        res.end(JSON.stringify(await listApplications({ currentPage, pageSize })));
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
        await sendConfirmationEmail(clientGeneratedId, req.body.contact.emailAddress);
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
