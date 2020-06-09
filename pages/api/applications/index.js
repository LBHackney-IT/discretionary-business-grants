import uploadApplication from '../../../lib/usecases/uploadApplication';
import { nanoid } from 'nanoid';

export default async (req, res) => {
  try {
    const clientGeneratedId = nanoid();
    await uploadApplication({ ...req.body, clientGeneratedId });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(clientGeneratedId));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify(error.message));
  }
};
