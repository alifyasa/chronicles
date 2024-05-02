import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juimprmxcbtcnaxzemoc.supabase.co";
// Anon key, safe to use in public but needed correct security in backend
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1aW1wcm14Y2J0Y25heHplbW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMjM3MjUsImV4cCI6MjAyOTU5OTcyNX0.K-l0F_Zfo42c5UroRFiOoGhXM1xLskCJvdyN38w7IUM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export interface Journey {
  created_at: Date;
  creator_id: string;
  description: null;
  id: string;
  name: string;
}
