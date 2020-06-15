import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';
import { nanoid } from 'nanoid';
import listApplications from '../../../lib/usecases/listApplications';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(await listApplications()));
      } catch (error) {
        console.log('Application list error:', error, 'request:', req);
        res.statusCode = 500;
        res.end(JSON.stringify('Unable to list applications'));
      }
      break;

    case 'POST':
      try {
        const clientGeneratedId = nanoid();
        //TODO We should 400 on invalid application and 500 on Error
        const validApplication = await isValidApplication(req.body);
        await uploadApplication({ ...validApplication, clientGeneratedId });
        await sendConfirmationEmail(
          clientGeneratedId,
          req.body.contact.emailAddress
        );
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(clientGeneratedId));
      } catch (error) {
        console.log('Application submission error:', error, 'request:', req);
        res.statusCode = 400;
        res.end(JSON.stringify(error.message));
      }
      break;

    default:
      res.statusCode = 400;
      res.end(JSON.stringify('Invalid request method'));
  }
};
