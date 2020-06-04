import getSecureUploadUrl from '../../../lib/usecases/getSecureUploadUrl';

export default async (req, res) => {
  try {
    const { fileKey, fileName } = req.body;
    const { documentId, fields, url } = await getSecureUploadUrl(fileKey);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        url,
        fields: {
          key: `${fileKey}/${documentId}/${fileName}`,
          ...fields,
          'X-Amz-Server-Side-Encryption': 'AES256',
          'X-Amz-Meta-Description': fileKey
        }
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
};
