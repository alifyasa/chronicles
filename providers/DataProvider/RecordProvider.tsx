import React from "react";
import { supabase } from "@/utils/supabase";
import { Record } from "@/utils/supabase/types";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import Timezone from "react-native-timezone";
import { useSession } from "../AuthProvider";

interface RecordContextInterface {
  record: Record[];
  recordKV: { [key: string]: Record };

  isFetchingRecord: boolean;
  fetchRecord: () => void;

  isAddingRecord: boolean;
  addRecord: (
    recordName: string | null,
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
  const [record, setIsRecord] = useState<Record[]>([]);
  const recordKV = record.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.record_id]: curr,
    }),
    {}
  );
  const [isFetching, setIsFetching] = useState(false);
  async function getRecordFromSupabase() {
    setIsFetching(true);
    console.log(`[RECORD] Fetching Records`);
    const { data: record, error } = await supabase.rpc("all_records");
    setIsFetching(false);
    if (error || !record) {
      return Toast.show({
        type: "error",
        text1: "Error Fetching Records",
        text2: error?.message,
      });
    }
    setIsRecord(record as Record[]);
    console.log(`[RECORD] Fetched ${record?.length} Record(s)`);
  }
  const getRecordCallback = useCallback(() => {
    if (isInitDone) {
      getRecordFromSupabase();
    }
  }, [isInitDone]);

  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const addRecord: RecordContextInterface["addRecord"] = async (
    recordName,
    recordDescription,
    recordType
  ) => {
    setIsAddingRecord(true);
    const { data } = await supabase.rpc("create_record", {
      arg_name: recordName,
      arg_desc: recordDescription,
      arg_type: recordType,
      arg_tz: Timezone.getTimeZone(),
    });
    setIsAddingRecord(false);
    return {
      error: (data as string).startsWith("FAIL"),
      message: data,
    };
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
