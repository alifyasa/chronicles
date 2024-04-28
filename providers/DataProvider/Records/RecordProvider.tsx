import React from "react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { useSession } from "../../AuthProvider";
import { Record } from "../../../utils/supabase/records/schema";
import { getAllRecords } from "@/utils/supabase/records/getAllRecords";
import { addNewRecord } from "@/utils/supabase/records/addNewRecord";

interface RecordContextInterface {
  record: Record[];
  recordKV: { [key: string]: Record };

  isFetchingRecord: boolean;
  fetchRecord: () => void;

  isAddingRecord: boolean;
  addRecord: (
    recordName: string,
    recordDescription: string | null,
    recordType: Record["type"]
  ) => Promise<{ error: boolean; message: string }>;
}
const defaultRecordContext: RecordContextInterface = {
  record: [],
  recordKV: {},

  isFetchingRecord: false,
  fetchRecord: () => {},

  isAddingRecord: false,
  addRecord: async () => ({
    error: false,
    message: "Placeholder Message",
  }),
};
const RecordContext =
  createContext<RecordContextInterface>(defaultRecordContext);
const useRecord = () => {
  const value = useContext(RecordContext);
  return value;
};

function RecordProvider(props: PropsWithChildren) {
  const { isInitDone } = useSession();
  const [record, setRecord] = useState<Record[]>([]);
  const recordKV = record.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.record_id]: curr,
    }),
    {}
  );
  const [isFetching, setIsFetching] = useState(false);
  const getRecordCallback = useCallback(() => {
    if (isInitDone) {
      // getRecordFromSupabase();
      setIsFetching(true);
      getAllRecords()
        .then((records) => {
          setRecord(records);
          return;
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err,
          });
          return;
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isInitDone]);

  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const addRecord: RecordContextInterface["addRecord"] = async (
    recordName,
    recordDescription,
    recordType
  ) => {
    setIsAddingRecord(true);
    return addNewRecord(recordName, recordDescription, recordType)
      .then((result) => {
        return {
          error: (result as string).startsWith("FAIL"),
          message: result,
        };
      })
      .finally(() => {
        setIsAddingRecord(false);
      });
  };
  return (
    <RecordContext.Provider
      value={{
        record,
        recordKV,

        isFetchingRecord: isFetching,
        fetchRecord: getRecordCallback,

        isAddingRecord,
        addRecord,
      }}
    >
      {props.children}
    </RecordContext.Provider>
  );
}

export { RecordProvider, useRecord };
