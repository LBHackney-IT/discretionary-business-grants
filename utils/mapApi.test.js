import mapAPI from 'utils/mapAPI';
import fromUI from './fixtures/fromUI.json';
import toAPI from './fixtures/toAPI.json';

describe('mapApi util', () => {
  it('should map correctly the APIs', () => {
    expect(mapAPI(fromUI)).toEqual(toAPI);
  });
});
