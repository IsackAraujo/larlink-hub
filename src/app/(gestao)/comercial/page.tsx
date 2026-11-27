import { AgentSection } from "@/components/agents/AgentSection";
import { FunnelBar } from "@/components/ui/FunnelBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { StageBadge } from "@/components/ui/StageBadge";
import { Stat } from "@/components/ui/Stat";
import { ETAPAS, type EtapaId } from "@/lib/funil/etapas";
import { createClient } from "@/lib/supabase/server";
import { startOfTodaySP } from "@/lib/time";
import { ArrowRight, Eye } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Comercial" };

const META_DIARIA = 6;

function startOfWeekSP(): string {
  const today = new Date(startOfTodaySP());
  const weekday = (today.getUTCDay() + 6) % 7; // segunda = 0
  return new Date(today.getTime() - weekday * 86_400_000).toISOString();
}

export default async function ComercialPage() {
  const supabase = await createClient();
  const { data: sdr } = await supabase.from("profiles").select("id, nome").eq("papel", "sdr").eq("ativo", true).limit(1).maybeSingle();

  const [{ data: leads }, { count: hoje }, { count: semana }, { count: respostasSemana }, { count: tarefasAbertas }] =
    await Promise.all([
      supabase.from("leads").select("id, imobiliaria, cidade, uf, etapa, etapa_desde").neq("etapa", "perdido"),
      supabase
        .from("lead_eventos")
        .select("id", { count: "exact", head: true })
        .eq("para_etapa", "contato_feito")
        .gte("criado_em", startOfTodaySP()),
      supabase
        .from("lead_eventos")
        .select("id", { count: "exact", head: true })
        .eq("para_etapa", "contato_feito")
        .gte("criado_em", startOfWeekSP()),
      supabase
        .from("lead_eventos")
        .select("id", { count: "exact", head: true })
        .eq("para_etapa", "respondeu")
        .gte("criado_em", startOfWeekSP()),
      supabase
        .from("tarefas")
        .select("id", { count: "exact", head: true })
        .is("concluida_em", null)
        .is("cancelada_em", null),
    ]);

  const porEtapa = new Map<string, number>();
  for (const l of leads ?? []) porEtapa.set(l.etapa, (porEtapa.get(l.etapa) ?? 0) + 1);
  const quentes = (leads ?? []).filter((l) => l.etapa === "com_isack" || l.etapa === "reuniao_marcada");
  const nome = sdr?.nome ?? "Luiz";

  return (
    <Page>
      <PageHeader
        title="Comercial"
        subtitle={`Como está o ${nome}`}
        aside={
          <Link
            href="/hoje"
            className="inline-flex h-11 items-center gap-1.5 rounded-pill bg-ink px-4 text-sm font-medium text-white md:h-10"
          >
            <Eye size={16} strokeWidth={1.75} /> Ver como o {nome}
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Abordagens hoje" value={hoje ?? 0} suffix={`/ ${META_DIARIA}`} sheen />
        <Stat label="Abordagens na semana" value={semana ?? 0} />
        <Stat label="Respostas na semana" value={respostasSemana ?? 0} />
        <Stat label="A abordar" value={porEtapa.get("prospect") ?? 0} />
      </div>

      <Section title="Funil do Luiz">
        <GlassCard>
          <FunnelBar steps={ETAPAS.map((e) => ({ label: e.label, value: porEtapa.get(e.id) ?? 0 }))} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-text-2">
            <span>
              Follow-ups em aberto: <span className="font-mono tabular-nums text-text">{tarefasAbertas ?? 0}</span>
            </span>
            <Link href="/leads" className="inline-flex items-center gap-1 font-medium text-ink underline-offset-4 hover:underline">
              Ver a lista de leads dele <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </GlassCard>
      </Section>

      <Section title="Leads quentes com você" count={quentes.length}>
        {quentes.length === 0 ? (
          <GlassCard>
            <p className="text-sm text-text-2">
              Quando o Luiz tocar em “Passar pro Isack”, o lead aparece aqui com a nota dele.
            </p>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-3">
            {quentes.map((l) => (
              <GlassCard key={l.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-text">{l.imobiliaria}</p>
                  <p className="truncate text-sm text-text-2">{[l.cidade, l.uf].filter(Boolean).join(" · ")}</p>
                </div>
                <StageBadge etapa={l.etapa as EtapaId} />
              </GlassCard>
            ))}
          </div>
        )}
      </Section>

      <AgentSection pilar="comercial" />
    </Page>
  );
}
