import { LeadList } from "@/components/crm/LeadList";
import type { LeadItem } from "@/components/crm/LeadCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  // SDR vê só os dele (RLS garante); a gestão vê os do SDR para acompanhar.
  let query = supabase
    .from("leads")
    .select("id, imobiliaria, cidade, uf, instagram, seguidores, observacoes, etapa")
    .in("etapa", ["prospect", "contato_feito", "respondeu", "com_isack"])
    .order("seguidores", { ascending: false, nullsFirst: false });
  if (user.papel === "sdr") query = query.eq("responsavel_id", user.id);

  const { data } = await query;
  const leads = (data ?? []) as LeadItem[];

  return (
    <Page>
      <PageHeader
        title="Leads"
        subtitle={user.papel === "sdr" ? `${leads.length} imobiliárias na sua lista` : `${leads.length} imobiliárias na lista do Luiz`}
      />
      <LeadList leads={leads} />
    </Page>
  );
}
