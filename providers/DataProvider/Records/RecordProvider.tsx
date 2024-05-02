import React from "react";
import { createContext, PropsWithChildren, useContext } from "react";

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
  const { allRecords, allRecordsKV, fetchAllRecords, isFetchingAllRecords } =
    withGetAllRecords();
  const { addRecord, isAddingRecord } = withAddRecord();
  const { addRecordEntry, isAddingRecordEntry } = withAddRecordEntry();
  const {
    recordEntriesByRecordId,
    isFetchingRecordEntries,
    fetchRecordEntriesById,
  } = withGetRecordEntriesById();
  return (
    <RecordContext.Provider
      value={{
        allRecords,
        allRecordsKV,
        isFetchingAllRecords,
        fetchAllRecords,

        isAddingRecord,
        addRecord,

        isAddingRecordEntry,
        addRecordEntry,

        recordEntriesByRecordId,
        isFetchingRecordEntries,
        fetchRecordEntriesById,
      }}
    >
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordProvider, useRecord };
