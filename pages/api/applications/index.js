import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';
import { nanoid } from 'nanoid';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      //TODO Return list of applications to admin
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify([
          {
            id: 123,
            clientGeneratedId: 'OneTwoThree',
            businessName: 'A Company',
            applicationDate: '2020-06-10T17:32:28Z',
            status: 'Submitted'
          },
          {
            id: 124,
            clientGeneratedId: 'OneTwoFour',
            businessName: 'B Company',
            applicationDate: '2020-06-9T11:32:28Z',
            status: 'Submitted'
          },
          {
            id: 125,
            clientGeneratedId: 'OneTwoFive',
            businessName: 'C Company',
            applicationDate: '2020-06-12T14:32:28Z',
            status: 'Submitted'
          }
        ])
      );
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
