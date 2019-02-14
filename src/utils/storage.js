export default {
  set (key, value = '') {
    if (!!key === true) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  get (key, defaultValue = '') {
    if (!!key === true) {
      let _v = window.localStorage.getItem(key);
      return _v ? JSON.parse(_v) : defaultValue;
    }
  },
  clear () {
    window.localStorage.clear();
  }
};
