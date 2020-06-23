import axios from 'axios';

const fileUploader = async (file, clientGeneratedId) => {
  // If you need to get past the file upload in your local dev
  // environment, uncomment the following line...
  // return 'faked_it_out_for_local_testing.ext';
  const { data } = await axios.post('/api/urls', {
    clientGeneratedId: clientGeneratedId,
    fileName: file.name
  });
  const formData = new FormData();
  Object.entries(data.fields).forEach(([key, value]) =>
    formData.append(key, value)
  );
  formData.append('file', file);
  await axios.post(data.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data.fileKey;
};

export default fileUploader;
