import { z } from "zod";
import { supabase } from "..";
import { Record, RecordEntrySchema, RecordSchema } from "./schema";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("SUPABASE/RECORD_ENTRY");
async function getRecordEntryById(record_id: Record["record_id"]) {
  logger.log(`Fetching Records`);
  const { data: records, error } = await supabase.rpc(
    "all_record_entry_by_id",
    {
      arg_rid: RecordSchema.shape.record_id.parse(record_id),
    }
  );
  if (error || !records) {
    throw new Error(`Error fetching records: ${error?.message}`);
  }
  logger.log(`Fetched ${records?.length} Record Entry`);
  logger.log(JSON.stringify(records, null, 2));
  try {
    return z.array(RecordEntrySchema).parse(
      records.map((recordEntry: object) => ({
        record_id,
        ...recordEntry,
      }))
    );
  } catch (err) {
    logger.log(JSON.stringify(err, null, 2));
    throw new Error("Error parsing record entry schema");
  }
}

export { getRecordEntryById };
