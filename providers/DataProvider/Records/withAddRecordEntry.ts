import { useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { addRecordEntry } from "@/utils/supabase/records/addRecordEntry";

export const defaultWithAddRecordEntry: ReturnType<typeof withAddRecordEntry> =
  {
    addRecordEntry: async () => false,
    isAddingRecordEntry: false,
  };
export function withAddRecordEntry() {
  // const [isAddingRecordEntry, setIsAddingRecordEntry] = useState(false);
  const [addingRecordEntryProcessCount, setAddingRecordEntryProcessCount] =
    useState(0);
  const isAddingRecordEntry = useMemo(
    () => addingRecordEntryProcessCount >= 1,
    [addingRecordEntryProcessCount],
  );
  const __addRecordEntry = async (recordId: string, entryMessage: string) => {
    setAddingRecordEntryProcessCount((prev) => prev + 1);
    return addRecordEntry(recordId, entryMessage, null)
      .then((result) => {
        if (result.startsWith("FAIL")) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: result,
          });
          return false;
        }
        return true;
      })
      .catch((err) => {
        if (err instanceof z.ZodError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.issues[0].message,
          });
          return;
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err,
        });
        return false;
      })
      .finally(() => {
        setAddingRecordEntryProcessCount((prev) => prev - 1);
      });
  };

  return {
    isAddingRecordEntry,
    addRecordEntry: __addRecordEntry,
  };
}
