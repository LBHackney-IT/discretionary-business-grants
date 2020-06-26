import MockDate from 'mockdate';

import { isExpired } from './date';

const expirationDate = new Date('2020-06-26');

describe('date utils', () => {
  describe('isExpired', () => {
    it('should work properly', () => {
      MockDate.set('2020-06-25');
      expect(isExpired(expirationDate, new Date())).toBe(false);
      MockDate.set('2020-06-27');
      expect(isExpired(expirationDate, new Date())).toBe(true);
    });
  });
});
