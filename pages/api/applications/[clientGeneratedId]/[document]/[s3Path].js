import * as HttpStatus from 'http-status-codes';
import signedUrl from '../../../../lib/usecases/getSignedDocumentUrl';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      
      const clientGeneratedId = req.query.clientGeneratedId;
      const s3Path = req.query.s3Path;

      console.log({clientGeneratedId, s3Path});
      try {
        const result = {"url" : await signedUrl({ s3Path })};
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify(result)
        );
      } catch (error) {
        console.log('Document Signed URL error:', error, 'request:', req);
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify('Unable to create a signed s3 document url'));
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};