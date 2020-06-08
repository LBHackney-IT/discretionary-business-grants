import uploadApplication from '../../../lib/usecases/uploadApplication';
import isValidApplication from '../../../lib/usecases/validators';
import { nanoid } from 'nanoid';

export default async (req, res) => {
  try {
    const clientGeneratedId = nanoid();
    const validApplication = await isValidApplication(req.body);
    if (!validApplication) throw Error('Application is invalid');
    await uploadApplication({ ...req.body, clientGeneratedId });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(clientGeneratedId));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify(error.message));
  }
};
