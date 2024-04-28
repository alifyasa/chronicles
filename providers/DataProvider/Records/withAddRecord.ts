import { addRecord } from "@/utils/supabase/records/addRecord";
import { Record } from "@/utils/supabase/records/schema";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function withAddRecord() {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const __addRecord = async (
    recordName: string,
    recordDescription: string,
    recordType: Record["type"]
  ) => {
    setIsAddingRecord(true);
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
        setIsAddingRecord(false);
      });
  };
  return {
    isAddingRecord,
    addRecord: __addRecord,
  };
}
