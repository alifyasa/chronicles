import { useSession } from "@/providers/AuthProvider";
import { getAllRecords } from "@/utils/supabase/records/getAllRecords";
import { Record } from "@/utils/supabase/records/schema";
import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

export const defaultWithGetAllRecords: ReturnType<typeof withGetAllRecords> = {
  allRecords: [],
  allRecordsKV: {},
  fetchAllRecords: async () => {},
  isFetchingAllRecords: false,
};
export function withGetAllRecords() {
  const { isInitDone } = useSession();
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const allRecordsKV: { [key: string]: Record } = allRecords.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.record_id]: curr,
    }),
    {}
  );
  const [fetchingAllRecordsProcessCount, setFetchingAllRecordsProcessCount] =
    useState(0);
  const isFetchingAllRecords = useMemo(
    () => fetchingAllRecordsProcessCount >= 1,
    [fetchingAllRecordsProcessCount]
  );
  const fetchAllRecords = useCallback(() => {
    if (isInitDone) {
      setFetchingAllRecordsProcessCount((prev) => prev + 1);
      getAllRecords()
        .then((records) => {
          setAllRecords(records);
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
          setFetchingAllRecordsProcessCount((prev) => prev - 1);
        });
    }
  }, [isInitDone]);

  return {
    allRecords,
    allRecordsKV,
    isFetchingAllRecords,
    fetchAllRecords,
  };
}
