import axios from 'axios';

export const fetchGrantOfficers = async () => {
  const { data } = await axios.get(
    `${process.env.URL_PREFIX}/api/grant-officers`
  );
  return data;
};
