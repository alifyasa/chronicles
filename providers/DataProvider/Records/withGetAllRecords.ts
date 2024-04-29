import { useSession } from "@/providers/AuthProvider";
import { getAllRecords } from "@/utils/supabase/records/getAllRecords";
import { Record } from "@/utils/supabase/records/schema";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export const defaultWithGetAllRecords: ReturnType<typeof withGetAllRecords> = {
  getAllRecords: async () => {},
  isFetchingRecords: false,
  record: [],
  recordKV: {},
};
export function withGetAllRecords() {
  const { isInitDone } = useSession();
  const [record, setRecord] = useState<Record[]>([]);
  const recordKV = record.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.record_id]: curr,
    }),
    {}
  );
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);
  const getRecordCallback = useCallback(() => {
    if (isInitDone) {
      setIsFetchingRecords(true);
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
          setIsFetchingRecords(false);
        });
    }
  }, [isInitDone]);

  return {
    record,
    recordKV,
    isFetchingRecords,
    getAllRecords: getRecordCallback,
  };
}
