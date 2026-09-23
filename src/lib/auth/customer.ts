import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { CustomerProfile } from "@/types/customer";

export async function getCustomerProfile(): Promise<CustomerProfile | null> {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return { id: data.id, email: data.email, fullName: data.full_name };
}
