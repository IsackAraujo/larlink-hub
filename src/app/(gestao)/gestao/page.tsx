import { removeRitual } from "./actions";
import { AgentSection } from "@/components/agents/AgentSection";
import { RitualForm } from "@/components/gestao/RitualForm";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { createClient } from "@/lib/supabase/server";
import { Trash2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gestão" };

const FREQ: Record<string, string> = { diario: "Diário", semanal: "Semanal", quinzenal: "Quinzenal", mensal: "Mensal" };

export default async function GestaoPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("rituais")
    .select("id, titulo, frequencia, quando, duracao_min, pauta")
    .eq("ativo", true)
    .order("criado_em");
  const rituais = data ?? [];

  return (
    <Page>
      <PageHeader title="Gestão" subtitle="Os processos que mantêm a Larlink de pé" aside={<BetaBadge />} />

      <Section title="Rituais" count={rituais.length}>
        <div className="grid gap-3 md:grid-cols-2">
          {rituais.map((r) => (
            <GlassCard key={r.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-text">{r.titulo}</p>
                  <p className="text-sm text-text-2">
                    {FREQ[r.frequencia] ?? r.frequencia}
                    {r.quando ? ` · ${r.quando}` : ""}
                    {r.duracao_min ? ` · ${r.duracao_min} min` : ""}
                  </p>
                </div>
                <form action={removeRitual.bind(null, r.id)}>
                  <button
                    type="submit"
                    aria-label={`Remover ${r.titulo}`}
                    className="flex size-11 items-center justify-center rounded-pill text-text-3 hover:bg-glass hover:text-err md:size-9"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </form>
              </div>
              {r.pauta && (
                <ol className="list-decimal space-y-1 pl-5 text-sm text-text-2">
                  {r.pauta
                    .split("\n")
                    .filter((l: string) => l.trim())
                    .map((l: string, i: number) => (
                      <li key={i}>{l}</li>
                    ))}
                </ol>
              )}
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Novo ritual">
        <RitualForm />
      </Section>

      <AgentSection pilar="gestao" />
    </Page>
  );
}
