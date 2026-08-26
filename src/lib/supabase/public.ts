import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseConfig } from "@/lib/supabase/config";

export function createPublicClient() {
  const { url, publishableKey } = requireSupabaseConfig();

  return createSupabaseClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
