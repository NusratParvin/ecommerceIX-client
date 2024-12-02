import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type NoopStorage = {
  getItem(key: string): Promise<null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

const createNoopStorage = (): NoopStorage => {
  return {
    // getItem(_key: string) {
    getItem() {
      return Promise.resolve(null);
    },
    // setItem(_key: string, value: string) {
    setItem() {
      return Promise.resolve();
    },
    // removeItem(_key: string) {
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
