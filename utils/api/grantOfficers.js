import axios from 'axios';

export const fetchGrantOfficers = async () => {
  const { data } = await axios.get(
    `${process.env.BASE_URL || ''}/api/grant-officers`
  );
  return data;
};
