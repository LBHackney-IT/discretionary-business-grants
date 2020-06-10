import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import getGovNotifyClient from '../../../lib/gateways/govNotify';
import { nanoid } from 'nanoid';

export default async (req, res) => {
  try {
    const clientGeneratedId = nanoid();
    const validApplication = await isValidApplication(req.body);
    await uploadApplication({ ...validApplication, clientGeneratedId });
    if (!validApplication) throw Error('Application is invalid');

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(clientGeneratedId));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify(error.message));
  }
};
