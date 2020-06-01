import axios from 'axios';

export const normalizeAddress = address => {
  const { uprn, postcode, ...addr } = address;
  return {
    addressText: Object.values(addr)
      .filter(a => a !== '')
      .join(', '),
    address
  };
};

export const lookupPostcode = async postcode => {
  const { data } = await axios.get(`/api/postcode/${postcode}`);
  return data.address.map(normalizeAddress);
};
