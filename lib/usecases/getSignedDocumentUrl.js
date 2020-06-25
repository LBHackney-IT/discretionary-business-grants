import createGateway from '../gateways/s3';
import s3config from '../s3config';

const documents = createGateway({
  ...s3config,
  configuration: { urlPrefix: process.env.BASE_URL, maxUploadBytes: 20971520 }
});

// eslint-disable-next-line no-unused-vars
export const signedUrl = async ({ s3Path }) => {
  return await documents.getDownloadUrl(s3Path);
};
