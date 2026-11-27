import { AgentSection } from "@/components/agents/AgentSection";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Produto" };

const ROADMAP = [
  {
    coluna: "Agora",
    itens: [
      "Clientes atuais rodando sem falha (ADR e M & WFA)",
      "Atendimento no WhatsApp respondendo rápido e marcando visita",
    ],
  },
  {
    coluna: "Próximo",
    itens: ["Instagram e Messenger no mesmo atendimento", "Painel para a imobiliária ver os próprios números"],
  },
  {
    coluna: "Depois",
    itens: ["Fluxos do n8n configuráveis por cliente (sem clonar)", "Implantação quase sozinha para escalar"],
  },
];

export default function ProdutoPage() {
  return (
    <Page>
      <PageHeader title="Produto" subtitle="O que o Pedro e o Alexandre estão construindo" aside={<BetaBadge />} />

      <Section title="Roadmap">
        <p className="px-1 text-sm text-text-2">Exemplo montado com o que já foi decidido. Na próxima versão, cada item vira editável.</p>
        <div className="grid gap-3 md:grid-cols-3">
          {ROADMAP.map((c) => (
            <GlassCard key={c.coluna} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-text">{c.coluna}</p>
              {c.itens.map((i) => (
                <p key={i} className="rounded-md border border-line bg-glass-strong p-3 text-sm text-text">
                  {i}
                </p>
              ))}
            </GlassCard>
          ))}
        </div>
      </Section>

      <AgentSection pilar="produto" />
    </Page>
  );
}
