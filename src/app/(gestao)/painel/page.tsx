import { ModuleGrid } from "@/components/nav/ModuleGrid";
import { FunnelBar } from "@/components/ui/FunnelBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { getCurrentUser } from "@/lib/auth";
import { ETAPAS } from "@/lib/funil/etapas";
import { createClient } from "@/lib/supabase/server";
import { greetingSP } from "@/lib/time";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Painel" };

export default async function PainelPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const [{ data: leads }, { data: clientes }] = await Promise.all([
    supabase.from("leads").select("etapa"),
    supabase.from("clientes").select("valor_mensal, status"),
  ]);

  const porEtapa = new Map<string, number>();
  for (const l of leads ?? []) porEtapa.set(l.etapa, (porEtapa.get(l.etapa) ?? 0) + 1);

  const ativos = (clientes ?? []).filter((c) => c.status !== "cancelado");
  const mrr = ativos.reduce((s, c) => s + Number(c.valor_mensal ?? 0), 0);
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <Page>
      <PageHeader title="Painel" subtitle={`${greetingSP()}, ${user.nome}`} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Clientes" value={ativos.length} sheen />
        <Stat label="MRR" value={brl.format(mrr)} />
        <Stat label="Com o Isack" value={porEtapa.get("com_isack") ?? 0} />
        <Stat label="Leads no funil" value={leads?.length ?? 0} />
      </div>

      <Section title="Funil agora">
        <GlassCard>
          <FunnelBar steps={ETAPAS.map((e) => ({ label: e.label, value: porEtapa.get(e.id) ?? 0 }))} />
          {(leads?.length ?? 0) === 0 && (
            <p className="mt-4 text-sm text-text-2">
              O funil está vazio. Importe uma lista de leads para o Luiz começar.
            </p>
          )}
        </GlassCard>
      </Section>
      <Section title="Módulos">
        <ModuleGrid skip="/painel" />
      </Section>
    </Page>
  );
}
