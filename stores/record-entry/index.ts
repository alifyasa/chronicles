import { addRecordEntry } from "@/utils/supabase/records/addRecordEntry";
import { getRecordEntryById } from "@/utils/supabase/records/getRecordEntryById";
import {
  RecordEntry,
  RecordEntrySchema,
} from "@/utils/supabase/records/schema";
import { makeAutoObservable } from "mobx";

class RecordEntryStore {
  constructor() {
    makeAutoObservable(this);
  }

  recordEntries: { [recordId: string]: RecordEntry[] } = {};

  fetchingRecordEntriesTaskCount = 0;
  get isFetchingRecordEntries() {
    return this.fetchingRecordEntriesTaskCount > 0;
  }
  async fetchRecordEntries(recordId: string) {
    const record_id = RecordEntrySchema.shape.record_id.parse(recordId);

    this.fetchingRecordEntriesTaskCount++;
    const recordEntries = await getRecordEntryById(record_id);
    this.recordEntries[record_id] = recordEntries;
    this.fetchingRecordEntriesTaskCount--;
  }

  addRecordEntryTaskCount = 0;
  get isAddingRecordEntry() {
    return this.addRecordEntryTaskCount > 0;
  }
  async addRecordEntry(recordId: string, entryMessage: string) {
    const record_id = RecordEntrySchema.shape.record_id.parse(recordId);
    const entry_message = RecordEntrySchema.shape.message.parse(entryMessage);

    this.addRecordEntryTaskCount++;
    await addRecordEntry(record_id, entry_message, null);
    await this.fetchRecordEntries(record_id);
    this.fetchingRecordEntriesTaskCount--;
  }
}
const recordEntryStore = new RecordEntryStore();
export { recordEntryStore };
