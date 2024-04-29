import { addRecordEntry } from "@/utils/supabase/records/addRecordEntry";

import { useState } from "react";

import Toast from "react-native-toast-message";
import { z } from "zod";

export const defaultWithAddRecordEntry: ReturnType<typeof withAddRecordEntry> =
  {
    addRecordEntry: async () => false,
    isAddingRecordEntry: false,
  };
export function withAddRecordEntry() {
  const [isAddingRecordEntry, setIsAddingRecordEntry] = useState(false);
  const __addRecordEntry = async (recordId: string, entryMessage: string) => {
    setIsAddingRecordEntry(true);
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
        setIsAddingRecordEntry(false);
      });
  };

  return {
    isAddingRecordEntry,
    addRecordEntry: __addRecordEntry,
  };
}
