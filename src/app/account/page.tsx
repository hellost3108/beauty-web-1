import { redirect } from "next/navigation";
import { getCustomerProfile } from "@/lib/auth/customer";
import { createClient } from "@/lib/supabase/server";
import Account from "@/views/Account";
import type { Address, OrderRecord } from "@/types/customer";

export default async function AccountPage() {
  const profile = await getCustomerProfile();
  if (!profile) redirect("/login?next=/account");

  const supabase = await createClient();
  const [{ data: addresses }, { data: orders }] = await Promise.all([
    supabase
      .from("addresses")
      .select("*")
      .eq("user_id", profile.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <Account
      profile={profile}
      addresses={(addresses ?? []) as Address[]}
      orders={(orders ?? []) as OrderRecord[]}
    />
  );
}
