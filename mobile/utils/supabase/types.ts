export interface Record {
    record_id: string,
    created_at: string,
    name: string,
    description: string | null,
    type: "GENERAL" | "JOURNEY"
}