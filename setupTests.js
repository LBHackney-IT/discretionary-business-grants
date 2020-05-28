import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/en-GB';
import '@testing-library/jest-dom/extend-expect';

global.console = {
  log: jest.fn(), // console.log are ignored in tests
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug
};

if (global.Intl) {
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
} else {
  global.Intl = IntlPolyfill;
}
