const PREFIX = 'hackney_';

export const set = (ref, data) => {
  try {
    localStorage.setItem(`${PREFIX}${ref}`, JSON.stringify(data));
  } catch (e) {
    console.error('there was a problem saving a copy of your confirmation.');
  }
};

export const get = ref => {
  try {
    return JSON.parse(localStorage.getItem(`${PREFIX}${ref}`));
  } catch (e) {
    console.error('there was a problem retrieving a copy your confirmation.');
  }
};
