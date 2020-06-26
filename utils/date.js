import isBefore from 'date-fns/isBefore';

export const isExpired = (expirationDate, date) =>
  isBefore(expirationDate, date);
