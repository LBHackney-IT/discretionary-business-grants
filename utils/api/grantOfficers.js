import axios from 'axios';

export const fetchGrantOfficers = async () => {
  console.log('31561356136');
  const { data } = await axios.get(
    // Todo pass in host dynamically...
    'http://dev.discretionarybusinessgrants.hackney.gov.uk:3000/api/grant-officers'
  );
  console.log('adrtsertag');
  console.log(data);
  return data;
};
