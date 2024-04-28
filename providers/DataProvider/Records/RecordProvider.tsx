import React from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import { Record, RecordEntry } from "../../../utils/supabase/records/schema";
import withGetAllRecords from "./withGetAllRecords";
import withAddRecord from "./withAddRecord";
import withAddRecordEntry from "./withAddRecordEntry";

interface IRecordContext {
  record: Record[];
  recordKV: { [key: string]: Record };

  isFetchingRecord: boolean;
  fetchRecord: () => void;

  isAddingRecord: boolean;
  addRecord: (
    recordName: string,
    recordDescription: string,
    recordType: Record["type"]
  ) => Promise<boolean>;

  isAddingRecordEntry: boolean;
  addRecordEntry: (
    recordId: string,
    recordMessage: string,
    scheduledAt: RecordEntry["scheduled_at"]
  ) => Promise<boolean>;
}
const defaultRecordContext: IRecordContext = {
  record: [],
  recordKV: {},

  isFetchingRecord: false,
  fetchRecord: () => {},

  isAddingRecord: false,
  addRecord: async () => false,

  isAddingRecordEntry: false,
  addRecordEntry: async () => false,
};

const RecordContext = createContext<IRecordContext>(defaultRecordContext);
const useRecord = () => {
  const value = useContext(RecordContext);
  return value;
};

function RecordProvider(props: PropsWithChildren) {
  const { record, recordKV, isFetchingRecords, getAllRecords } =
    withGetAllRecords();
  const { addRecord, isAddingRecord } = withAddRecord();
  const { addRecordEntry, isAddingRecordEntry } = withAddRecordEntry();
  return (
    <RecordContext.Provider
      value={{
        record,
        recordKV,

        isFetchingRecord: isFetchingRecords,
        fetchRecord: getAllRecords,

        isAddingRecord,
        addRecord,

        isAddingRecordEntry,
        addRecordEntry,
      }}
    >
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordProvider, useRecord };
