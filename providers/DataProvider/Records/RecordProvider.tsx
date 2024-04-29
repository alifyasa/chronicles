import React from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import { defaultWithAddRecord, withAddRecord } from "./withAddRecord";
import {
  defaultWithAddRecordEntry,
  withAddRecordEntry,
} from "./withAddRecordEntry";
import {
  defaultWithGetAllRecords,
  withGetAllRecords,
} from "./withGetAllRecords";
import {
  defaultWithGetAllRecordEntriesById,
  withGetRecordEntriesById,
} from "./withGetRecordEntryById";

const defaultRecordContext = {
  ...defaultWithAddRecord,
  ...defaultWithAddRecordEntry,
  ...defaultWithGetAllRecords,
  ...defaultWithGetAllRecordEntriesById,
};
type RecordContextType = typeof defaultRecordContext;

const RecordContext = createContext<RecordContextType>(defaultRecordContext);
const useRecord = () => {
  const value = useContext(RecordContext);
  return value;
};

function RecordProvider(props: PropsWithChildren) {
  const { record, recordKV, isFetchingRecords, getAllRecords } =
    withGetAllRecords();
  const { addRecord, isAddingRecord } = withAddRecord();
  const { addRecordEntry, isAddingRecordEntry } = withAddRecordEntry();
  const {
    recordEntriesByRecordId,
    isFetchingRecordEntries,
    getRecordEntriesByIdCallback,
  } = withGetRecordEntriesById();
  return (
    <RecordContext.Provider
      value={{
        record,
        recordKV,
        isFetchingRecords,
        getAllRecords,

        isAddingRecord,
        addRecord,

        isAddingRecordEntry,
        addRecordEntry,

        recordEntriesByRecordId,
        isFetchingRecordEntries,
        getRecordEntriesByIdCallback,
      }}
    >
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordProvider, useRecord };
