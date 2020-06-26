import * as HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import AppContainer from '../../../containers/AppContainer';
import { getUserStringFromCookie } from 'utils/auth';
import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';

export default async (req, res) => {
  const rightNow = new Date();
  const lastSubmission = new Date('2020-06-26T23:00:00.000Z');

  switch (req.method) {
    case 'GET':
      try {
        const container = AppContainer.getInstance();
        const listApplications = container.getListApplications();
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        const currentPage =
          req.query && req.query.page
            ? parseInt(req.query.page, 10)
            : undefined;
        const pageSize =
          req.query && req.query.pageSize
            ? parseInt(req.query.pageSize, 10)
            : undefined;
        const sort = req.query && req.query.sort ? req.query.sort : undefined;
        const status =
          req.query && req.query.status ? req.query.status : undefined;
        const businessType =
          req.query && req.query.businessType
            ? req.query.businessType
            : undefined;
        const grantOfficer =
          req.query && req.query.grantOfficer
            ? req.query.grantOfficer
            : undefined;
        res.end(
          JSON.stringify(
            await listApplications({
              currentPage,
              pageSize,
              sort,
              status,
              businessType,
              grantOfficer
            })
          )
        );
      } catch (error) {
        console.log('Application list error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to list applications'));
      }
      break;

    case 'POST':
      if (rightNow >= lastSubmission) {
        res.statusCode = HttpStatus.FORBIDDEN;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Applications have closed.' }));
        break;
      }

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

    case 'PATCH':
      try {
        const container = AppContainer.getInstance();
        const patchApplications = container.getPatchApplications();
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'filename=export.csv');
        const patchResponse = await patchApplications({
          author: getUserStringFromCookie(req.headers.cookie)
        });
        res.end(patchResponse.csvString);
      } catch (error) {
        console.log('Applications patch error:', error, 'request:', req);
        res.statusCode = HttpStatus.BAD_REQUEST;
        res.end(JSON.stringify(error.message));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
