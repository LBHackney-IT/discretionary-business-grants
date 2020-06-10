import validate from './validators';
import data from 'utils/fixtures/toAPI';

describe('validator', () => {
  it('works properly', async () => {
    try {
      const result = await validate(data);
      expect(result).toBeDefined();
    } catch (e) {
      throw e.message;
    }
  });
});
