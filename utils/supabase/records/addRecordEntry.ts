import Timezone from "react-native-timezone";
import { z } from "zod";

import { createDefaultLogger } from "@/utils/logging";

import { supabase } from "..";
import { RecordEntry, RecordEntrySchema } from "./schema";

const logger = createDefaultLogger("SUPABASE/RECORD");
async function addRecordEntry(
  record_id: RecordEntry["message"],
  message: RecordEntry["message"],
  scheduled_at: RecordEntry["scheduled_at"],
) {
  const schemaParser = RecordEntrySchema.shape;
  try {
    const { data } = await supabase.rpc("add_record_entry", {
      arg_id: schemaParser.record_id.parse(record_id),
      arg_message: schemaParser.message.parse(message),
      arg_schedule: schemaParser.scheduled_at.parse(scheduled_at),
      arg_tz: z.string().parse(Timezone.getTimeZone()),
    });
    return z.string().parse(data);
  } catch (err) {
    logger.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

export { addRecordEntry };
