import { nanoid } from 'nanoid';
import createGateway from '../gateways/s3';
import s3config from '../s3config';

const documents = createGateway({
  ...s3config,
  configuration: { urlPrefix: process.env.BASE_URL, maxUploadBytes: 20971520 }
});

export default async dropboxId => {
  const documentId = nanoid(15);
  const uploadOptions = await documents.createUploadUrl(dropboxId, documentId);
  return { documentId, ...uploadOptions };
};
