import axios from 'axios';

export const fetchGrantOfficers = async (host = '') => {
  const { data } = await axios.get(`${host}/api/grant-officers`);
  return data;
};
