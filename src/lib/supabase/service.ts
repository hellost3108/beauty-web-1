import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/supabase/config";

/*
 * Service-role client, used ONLY on the server to create staff accounts and
 * reset their passwords. The key must be set as SUPABASE_SERVICE_ROLE_KEY
 * (no NEXT_PUBLIC_ prefix) so it never reaches the browser bundle.
 */
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

export const isServiceRoleConfigured = Boolean(supabaseUrl && serviceRoleKey);

export function createServiceClient() {
  if (!isServiceRoleConfigured) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
