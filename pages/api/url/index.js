import getSecureUploadUrl from '../../../lib/usecases/getSecureUploadUrl';

export default async (req, res) => {
  try {
    let response = {};
    const { documentId, fields, url } = await getSecureUploadUrl(req.body.id);
    response.documentId = documentId;
    response.fields = fields;
    response.url = url;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ response }));
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
};
