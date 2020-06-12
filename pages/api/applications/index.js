import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import sendConfirmationEmail from '../../../lib/usecases/sendConfirmationEmail';
import { nanoid } from 'nanoid';

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      //TODO Return list of applications to admin
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify("YOU'RE AN ADMIN!"));
    }
    const clientGeneratedId = nanoid(10);
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
    res.statusCode = 400;
    res.end(JSON.stringify(error.message));
  }
};
