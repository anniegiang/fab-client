export const localStorageMock = (function () {
  let storage: {[key in string]: string} = {};
  return {
    length: function () {
      return Object.keys(storage).length;
    },
    getItem: function (key: string) {
      return storage[key];
    },
    setItem: function (key: string, value: any) {
      storage[key] = value.toString();
      return value;
    },
    removeItem: function (key: string) {
      delete storage[key];
      return true;
    },
    clear: function () {
      storage = {};
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});
