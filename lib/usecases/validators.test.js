import validate from './validators';
import data from 'utils/fixtures/fromUI';
import dataCasted from 'utils/fixtures/toAPI';

describe('validator', () => {
  it('works properly', async () => {
    try {
      const result = await validate(data);
      expect(result).toEqual(dataCasted);
    } catch (e) {
      throw e.message;
    }
  });
});
