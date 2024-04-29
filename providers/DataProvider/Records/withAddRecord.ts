import { addRecord } from "@/utils/supabase/records/addRecord";
import { Record } from "@/utils/supabase/records/schema";
import { useMemo, useState } from "react";
import Toast from "react-native-toast-message";

export const defaultWithAddRecord: ReturnType<typeof withAddRecord> = {
  isAddingRecord: false,
  addRecord: async () => false,
};
export function withAddRecord() {
  // const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [addingRecordProcessCount, setAddingRecordProcessCount] = useState(0);
  const isAddingRecord = useMemo(
    () => addingRecordProcessCount >= 1,
    [addingRecordProcessCount]
  );

  const __addRecord = async (
    recordName: string,
    recordDescription: string,
    recordType: Record["type"]
  ) => {
    setAddingRecordProcessCount((prev) => prev + 1);
    return addRecord(recordName, recordDescription, recordType)
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
        setAddingRecordProcessCount((prev) => prev - 1);
      });
  };
  return {
    isAddingRecord,
    addRecord: __addRecord,
  };
}
