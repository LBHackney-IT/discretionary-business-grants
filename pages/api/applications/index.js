import uploadApplication from '../../../lib/usecases/uploadApplication';

export default async (req, res) => {
  try {
    await uploadApplication(req.body);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
};
