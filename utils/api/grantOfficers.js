import axios from 'axios';

export const fetchGrantOfficers = async () => {
  const { data } = await axios.get('/api/grant-officers');
  return data;
};
