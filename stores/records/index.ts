import { SavedToAsyncStorage } from "..";

class RecordStore implements SavedToAsyncStorage {
  initFromAsyncStorage = async () => {};
}
const recordStore = new RecordStore();
export { recordStore };
