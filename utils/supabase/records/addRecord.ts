import { z } from "zod";
import { supabase } from "..";
import { Record, RecordSchema } from "./schema";
import Timezone from "react-native-timezone";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("SUPABASE/RECORD");
async function addRecord(
  name: Record["name"],
  description: Record["description"],
  type: Record["type"],
) {
  const schemaParser = RecordSchema.shape;
  try {
    const { data } = await supabase.rpc("create_record", {
      arg_name: schemaParser.name.parse(name),
      arg_desc: schemaParser.description.parse(description),
      arg_type: schemaParser.type.parse(type),
      arg_tz: z.string().parse(Timezone.getTimeZone()),
    });
    return z.string().parse(data);
  } catch (err) {
    logger.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

export { addRecord };
