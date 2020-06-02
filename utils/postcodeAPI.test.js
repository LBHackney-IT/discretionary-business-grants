import { normalizeAddress } from './postcodeAPI';

describe('postcodeAPI', () => {
  describe('normalizeAddresses', () => {
    it('should work properly', () => {
      expect(
        normalizeAddress({
          line1: '407 QUEENSBRIDGE ROAD',
          line2: 'HACKNEY',
          line3: '',
          line4: '',
          town: 'LONDON',
          postcode: 'E8 3AS',
          uprn: 100021068079
        })
      ).toEqual({
        address: {
          line1: '407 QUEENSBRIDGE ROAD',
          line2: 'HACKNEY',
          line3: '',
          line4: '',
          town: 'LONDON',
          postcode: 'E8 3AS',
          uprn: 100021068079
        },
        addressText: '407 QUEENSBRIDGE ROAD, HACKNEY, LONDON'
      });
    });
  });
});
