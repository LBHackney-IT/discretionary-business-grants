import axios from 'axios';

const fileUploader = async (file, clientGeneratedId) => {
  const { data } = await axios.post('/api/urls', {
    clientGeneratedId: clientGeneratedId,
    fileName: file.name
  });
  const formData = new FormData();
  Object.entries(data.fields).forEach(([key, value]) => formData.append(key, value));
  formData.append('file', file);
  await axios.post(data.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data.fileKey;
};

export default fileUploader;
