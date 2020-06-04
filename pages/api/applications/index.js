import uploadApplication from '../../../lib/usecases/uploadApplication';
import { v4 as uuidv4 } from 'uuid'

export default async (req, res) => {
  try {
    const clientGeneratedId = uuidv4()
    await uploadApplication({ ...req.body, clientGeneratedId });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(clientGeneratedId));
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
};
