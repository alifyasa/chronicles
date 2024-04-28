import { useSession } from "@/providers/AuthProvider";
import { getRecordEntryById } from "@/utils/supabase/records/getRecordEntryById";
import { Record, RecordEntry } from "@/utils/supabase/records/schema";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

type RecordEntriesByRecordId = {
  [record_id: string]: RecordEntry;
};
export default function withGetRecordEntriyById(arg_id: Record["record_id"]) {
  const { isInitDone } = useSession();
  const [recordEntriesByRecordId, setRecordEntriesByRecordId] =
    useState<RecordEntriesByRecordId>({});
  const [isFetchingRecordEntries, setIsFetchingRecordEntries] = useState(false);
  const getRecordCallback = useCallback(() => {
    if (isInitDone) {
      setIsFetchingRecordEntries(true);
      getRecordEntryById(arg_id)
        .then((__recordEntriesByRecordId) => {
          __recordEntriesByRecordId.forEach((recordEntries) => {
            setRecordEntriesByRecordId((prev) => {
              const { [recordEntries.record_id]: sameKey, ...restPrev } = prev;
              return {
                ...restPrev,
                [recordEntries.record_id]: {
                  ...sameKey,
                  ...recordEntries,
                },
              };
            });
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
  }, [isInitDone]);

  return {
    record: recordEntriesByRecordId,
    isFetchingRecords: isFetchingRecordEntries,
    getAllRecords: getRecordCallback,
  };
}
