import { normalise } from '../../../lib/utils/normalise';

describe('normalise', () => {
  it('normalises strings, including diacritics', () => {
    expect(normalise('Crème Brulée')).toBe('creme brulee');
    expect(normalise('Andreí')).toBe('andrei');
    expect(normalise('Amélie')).toBe('amelie');
    expect(normalise('François-Xavier')).toBe('francois-xavier');
    expect(normalise('Steve')).toBe('steve');
  });
});
