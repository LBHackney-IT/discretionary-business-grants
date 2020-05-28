export default class ArgumentError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ArgumentError);
    }

    this.name = 'ArgumentError';
    this.date = new Date();
  }
}
