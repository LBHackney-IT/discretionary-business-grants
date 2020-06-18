import createGateway from '../gateways/s3';
import s3config from '../s3config';

const documents = createGateway({
  ...s3config,
  configuration: { urlPrefix: process.env.URL_PREFIX, maxUploadBytes: 20971520 }
});

export default async signedUrl => {
  const url = await documents.getDownloadUrl(key);
  return url;
};