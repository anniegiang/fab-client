const errorMessage = "Storage is not available";

class LocalStorage {
  storage: Storage | undefined;

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = window.localStorage;
    }
  }

  get length() {
    if (!this.storage) throw new Error(errorMessage);
    return this.storage.length;
  }

  get(key: string) {
    if (!this.storage) throw new Error(errorMessage);
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    if (!this.storage) throw new Error(errorMessage);
    this.storage.setItem(key, value);
    return value;
  }

  remove(key: string) {
    if (!this.storage) throw new Error(errorMessage);
    return this.storage.removeItem(key);
  }
}

export default new LocalStorage();
