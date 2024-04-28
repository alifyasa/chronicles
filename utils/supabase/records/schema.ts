import { DateTime } from "luxon";
import { z } from "zod";

const RecordSchema = z.object({
  record_id: z.string(),
  created_at: z
    .string()
    .transform((str) => DateTime.fromSQL(str) as DateTime<true>)
    .refine((datetime) => datetime.isValid, {
      message: "Invalid DateTime string",
    }),
  name: z.string().trim().min(3).max(40),
  description: z
    .string()
    .trim()
    .max(400)
    // If empty string, make it null instead
    .transform((str) => (str.length === 0 ? null : str))
    .nullable(),
  type: z.enum(["GENERAL", "JOURNEY"]),
});
type Record = z.infer<typeof RecordSchema>;

const RecordEntrySchema = z.object({
  entry_id: z.string(),
  created_at: z
    .string()
    .transform((str) => DateTime.fromSQL(str) as DateTime<true>)
    .refine((datetime) => datetime.isValid, {
      message: "Invalid DateTime string",
    }),
  scheduled_at: z
    .string()
    .nullable()
    .transform((val) =>
      typeof val === "string" ? (DateTime.fromSQL(val) as DateTime<true>) : null
    )
    .refine((datetime) => datetime === null || datetime.isValid, {
      message: "Invalid DateTime string",
    }),

  record_id: z.string(),
  message: z
    .string()
    .trim()
    .max(400)
    // If empty string, make it null instead
    .transform((str) => (str.length === 0 ? null : str))
    .nullable(),
});
type RecordEntry = z.infer<typeof RecordEntrySchema>;

export { RecordSchema, Record, RecordEntrySchema, RecordEntry };
