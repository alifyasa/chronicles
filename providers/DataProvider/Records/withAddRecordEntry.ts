import { addRecordEntry } from "@/utils/supabase/records/addRecordEntry";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function withAddRecordEntry() {
  const [isAddingRecordEntry, setIsAddingRecordEntry] = useState(false);
  const __addRecordEntry = async (
    recordName: string,
    recordDescription: string
  ) => {
    setIsAddingRecordEntry(true);
    return addRecordEntry(recordName, recordDescription, null)
      .then((result) => {
        if (result.startsWith("FAIL")) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: result,
          });
          return false;
        }
        Toast.show({
          type: "success",
          text1: "Success",
          text2: result,
        });
        return true;
      })
      .catch((err) => {
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
