import axios from 'axios';

export const fetchGrantOfficers = async () => {
  const { data } = await axios.get(
    // Todo pass in host dynamically...
    'http://dev.discretionarybusinessgrants.hackney.gov.uk:3000/api/grant-officers'
  );
  return data;
};
