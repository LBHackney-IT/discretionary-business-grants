import getSecureUploadUrl from '../../../lib/usecases/getSecureUploadUrl';

export default async (req, res) => {
  try {
    const { clientGeneratedId, fileName } = req.body;
    const { documentId, fields, url } = await getSecureUploadUrl(
      clientGeneratedId
    );
    const fileKey = `${clientGeneratedId}/${documentId}/${fileName}`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        fileKey,
        url,
        fields: {
          key: fileKey,
          ...fields,
          'X-Amz-Server-Side-Encryption': 'AES256',
          'X-Amz-Meta-Description': clientGeneratedId
        }
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
};
