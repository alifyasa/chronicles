import { addRecord } from "@/utils/supabase/records/addRecord";
import { getAllRecords } from "@/utils/supabase/records/getAllRecords";
import { Record, RecordSchema } from "@/utils/supabase/records/schema";
import { action, makeAutoObservable, observable, observe } from "mobx";

class RecordStore {
  @observable
  records: Record[] = [];
  setRecords(records: Record[]) {
    this.records = records;
  }
  get recordsKV(): { [record_id: string]: Record } {
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
    const result = await addRecord(record_name, record_desc, record_type);
    if (result.startsWith("FAIL")) {
      return false;
    }
    await this.fetchRecords();
    this.fetchingRecordsTaskCount--;
    return true;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
const recordStore = new RecordStore();
export { recordStore };
