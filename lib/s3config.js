import { S3 } from 'aws-sdk';

const bucketName = process.env.SUPPORTING_DOCUMENTS_BUCKET;
const s3Config = { s3ForcePathStyle: true };
const client = new S3(s3Config);
export default { client, bucketName };
