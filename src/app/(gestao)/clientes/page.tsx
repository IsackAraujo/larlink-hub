import { AgentSection } from "@/components/agents/AgentSection";
import { NewClientForm } from "@/components/clientes/NewClientForm";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/server";
import { HeartHandshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Clientes" };

const saudeStyle: Record<string, { label: string; cls: string }> = {
  verde: { label: "Saudável", cls: "bg-ok/10 text-ok" },
  amarelo: { label: "Atenção", cls: "bg-warn/10 text-warn" },
  vermelho: { label: "Em risco", cls: "bg-err/10 text-err" },
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default async function ClientesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clientes")
    .select("id, nome, plano, valor_mensal, status, saude, saude_motivo, inicio")
    .order("criado_em", { ascending: true });
  const clientes = (data ?? []).filter((c) => c.status !== "cancelado");
  const mrr = clientes.reduce((s, c) => s + Number(c.valor_mensal ?? 0), 0);
  const emRisco = clientes.filter((c) => c.saude === "vermelho" || c.saude === "amarelo").length;

  return (
    <Page>
      <PageHeader title="Sucesso do cliente" subtitle="Quem paga a Larlink e como eles estão" aside={<BetaBadge />} />

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Clientes ativos" value={clientes.length} sheen />
        <Stat label="MRR" value={brl.format(mrr)} />
        <Stat label="Pedem atenção" value={emRisco} />
      </div>

      <Section title="Clientes" count={clientes.length}>
        {clientes.length === 0 ? (
          <GlassCard>
            <EmptyState
              icon={HeartHandshake}
              title="Nenhum cliente cadastrado ainda"
              description="Cadastre a ADR e a M & WFA abaixo para o MRR e a saúde aparecerem aqui e no painel."
            />
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-3">
            {clientes.map((c) => {
              const s = saudeStyle[c.saude ?? "verde"] ?? saudeStyle.verde!;
              return (
                <GlassCard key={c.id} className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-text">{c.nome}</p>
                    <p className="text-sm text-text-2">
                      {c.plano ?? "Sem plano"} · {c.valor_mensal ? `${brl.format(Number(c.valor_mensal))}/mês` : "sem valor"}
                    </p>
                    {c.saude_motivo && <p className="mt-1 text-sm text-text-2">{c.saude_motivo}</p>}
                  </div>
                  <span className={cn("rounded-pill px-2.5 py-1 text-xs font-medium", s.cls)}>{s.label}</span>
                </GlassCard>
              );
            })}
          </div>
        )}
      </Section>

      <Section title="Cadastrar cliente">
        <NewClientForm />
      </Section>

      <AgentSection pilar="clientes" />
    </Page>
  );
}
