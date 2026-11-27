import { createBrowserClient } from "@supabase/ssr";

/** Cliente Supabase para Client Components. Usa só a chave pública; a RLS protege os dados. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
