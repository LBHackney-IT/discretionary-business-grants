/**
 * Normalises a string for comparison, including removing any
 * diacritics from the input to account for bad data entry or
 * input from systems where only ASCII is allowed.
 * @see https://stackoverflow.com/a/37511463
 * @param {string} string the string to normalise
 */
export function normalise(string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u{0300}-\u{036e}]/gu, '');
}
