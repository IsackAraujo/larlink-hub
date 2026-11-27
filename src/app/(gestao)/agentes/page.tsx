import { AgentCard } from "@/components/agents/AgentCard";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { AGENTES, PILARES, type Pilar } from "@/lib/agentes/catalogo";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Agentes" };

const PRIMEIROS = ["prospector", "chief-of-staff", "copiloto-abordagem"];

export default function AgentesPage() {
  const primeiros = AGENTES.filter((a) => PRIMEIROS.includes(a.id));
  return (
    <Page>
      <PageHeader title="Agentes" subtitle={`${AGENTES.length} agentes possíveis com a stack que vocês já têm`} aside={<BetaBadge />} />

      <GlassCard sheen>
        <p className="font-semibold text-text">Como cada agente entra em operação</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-text-2">
          <li>Sugere: faz o trabalho e entrega pronto, vocês decidem.</li>
          <li>Age com aprovação: executa depois de um toque de vocês.</li>
          <li>Age sozinho: só quando já acertou por semanas seguidas, com limites claros.</li>
        </ol>
        <p className="mt-3 text-sm text-text-2">Nenhum agente está ligado ainda. Esta tela é o mapa do que construir.</p>
      </GlassCard>

      <Section title="Comece por estes três" count={primeiros.length}>
        <p className="px-1 text-sm text-text-2">Menor esforço, efeito direto na meta de 5 clientes e na constância da operação.</p>
        <div className="grid gap-3 md:grid-cols-3">
          {primeiros.map((a) => (
            <AgentCard key={a.id} agente={a} />
          ))}
        </div>
      </Section>

      {(Object.keys(PILARES) as Pilar[]).map((p) => {
        const lista = AGENTES.filter((a) => a.pilar === p);
        return (
          <Section key={p} title={PILARES[p]} count={lista.length}>
            <div className="grid gap-3 md:grid-cols-2">
              {lista.map((a) => (
                <AgentCard key={a.id} agente={a} />
              ))}
            </div>
          </Section>
        );
      })}
    </Page>
  );
}
