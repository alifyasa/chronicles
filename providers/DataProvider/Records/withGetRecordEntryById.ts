import { useSession } from "@/providers/AuthProvider";
import { getRecordEntryById } from "@/utils/supabase/records/getRecordEntryById";
import { Record, RecordEntry } from "@/utils/supabase/records/schema";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

// const logger = createDefaultLogger(
//   "PROVIDER/DATA/RECORDS/GET_RECORD_ENTRY_BY_ID"
// );
export const defaultWithGetAllRecordEntriesById: ReturnType<
  typeof withGetRecordEntriesById
> = {
  fetchRecordEntriesById: () => {},
  isFetchingRecordEntries: false,
  recordEntriesByRecordId: {},
};
type RecordEntriesByRecordId = {
  [record_id: string]: RecordEntry[];
};
export function withGetRecordEntriesById() {
  const { isInitDone } = useSession();
  const [recordEntriesByRecordId, setRecordEntriesByRecordId] =
    useState<RecordEntriesByRecordId>({});
  const [isFetchingRecordEntries, setIsFetchingRecordEntries] = useState(false);
  const fetchRecordEntriesById = useCallback(
    (arg_id: Record["record_id"]) => {
      if (isInitDone) {
        setIsFetchingRecordEntries(true);
        getRecordEntryById(arg_id)
          .then((__recordEntriesByRecordId) => {
            setRecordEntriesByRecordId((prev) => {
              return {
                ...prev,
                [arg_id]: __recordEntriesByRecordId,
              };
            });
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
            setIsFetchingRecordEntries(false);
          });
      }
    },
    [isInitDone]
  );

  return {
    recordEntriesByRecordId,
    isFetchingRecordEntries,
    fetchRecordEntriesById,
  };
}
