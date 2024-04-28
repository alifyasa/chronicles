import { z } from "zod";
import { supabase } from "..";
import { RecordSchema } from "./schema";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("SUPABASE/RECORD");
async function getAllRecords() {
  logger.log(`Fetching Records`);
  const { data: records, error } = await supabase.rpc("all_records");
  if (error || !records) {
    throw new Error(`Error fetching records: ${error?.message}`);
  }
  logger.log(`Fetched ${records?.length} Record(s)`);
  try {
    return z.array(RecordSchema).parse(records);
  } catch (err) {
    logger.log(JSON.stringify(err, null, 2));
    throw new Error("Error parsing record schema");
  }
}

export { getAllRecords };
