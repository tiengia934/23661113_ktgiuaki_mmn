import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = " https://otkbstzmekitlravvcim.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90a2JzdHptZWtpdGxyYXZ2Y2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODI0ODIsImV4cCI6MjA3NzM1ODQ4Mn0.bK752qZVcaUDzNzMf_U0nKNSelD_DTW2pJk9bOiV5h8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
