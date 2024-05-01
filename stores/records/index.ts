import { addRecord } from "@/utils/supabase/records/addRecord";
import { getAllRecords } from "@/utils/supabase/records/getAllRecords";
import { Record, RecordSchema } from "@/utils/supabase/records/schema";
import { makeAutoObservable } from "mobx";

class RecordStore {
  constructor() {
    makeAutoObservable(this);
  }

  records: Record[] = [];
  get recordsKV() {
    return this.records.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.record_id]: curr,
      }),
      {}
    );
  }

  fetchingRecordsTaskCount = 0;
  get isFetchingRecords() {
    return this.fetchingRecordsTaskCount > 0;
  }
  async fetchRecords() {
    this.fetchingRecordsTaskCount++;
    const allRecords = await getAllRecords();
    this.records = allRecords;
    this.fetchingRecordsTaskCount--;
  }

  addRecordTaskCount = 0;
  get isAddingRecord() {
    return this.addRecordTaskCount > 0;
  }
  async addRecord(
    recordName: string,
    recordDescription: string,
    recordType: Record["type"]
  ) {
    const record_name = RecordSchema.shape.name.parse(recordName);
    const record_desc = RecordSchema.shape.description.parse(recordDescription);
    const record_type = RecordSchema.shape.type.parse(recordType);

    this.addRecordTaskCount++;
    await addRecord(record_name, record_desc, record_type);
    await this.fetchRecords();
    this.fetchingRecordsTaskCount--;
  }
}
const recordStore = new RecordStore();
export { recordStore };
