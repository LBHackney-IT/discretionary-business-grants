import axios from 'axios';

export const fetchApplications = async params => {
  const { data } = await axios.get('/api/applications', {
    params
  });
  return data;
};

export const patchApplications = async () => {
  const { data } = await axios.patch('/api/applications');
  return data;
};

export const fetchApplication = async applicationId => {
  const { data } = await axios.get(`/api/applications/${applicationId}`);
  return data;
};

export const postApplication = async applicationData => {
  const { data } = await axios.post('/api/applications', applicationData);
  return data;
};

export const patchApplication = async (applicationId, params) =>
  await axios.patch(`/api/applications/${applicationId}`, params);
