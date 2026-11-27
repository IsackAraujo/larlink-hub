import { AgentSection } from "@/components/agents/AgentSection";
import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Marketing" };

const COLUNAS = [
  {
    titulo: "Testando",
    itens: [
      { angulo: "Dor", gancho: "2h47 da manhã: o lead mandou mensagem. Quem respondeu?", formato: "Vídeo 15s" },
      { angulo: "Prova", gancho: "Caixa cheia: o WhatsApp da imobiliária sem ninguém atendendo", formato: "Vídeo 20s" },
      { angulo: "Conta", gancho: "Quanto custa um lead que esperou 3 horas por resposta?", formato: "Estático" },
    ],
  },
  { titulo: "Vencedores (escalar)", itens: [] },
  { titulo: "Pausados", itens: [] },
];

const REGRAS = [
  "Cortar: custo por conversa acima de R$ ___ depois de gastar R$ ___",
  "Escalar: +20% de orçamento por dia enquanto ficar abaixo de R$ ___ por conversa",
  "Volume: ___ criativos novos por semana, sempre 1 ângulo novo",
  "Teto: nunca passar de R$ ___ por dia sem aprovação",
];

export default function MarketingPage() {
  return (
    <Page>
      <PageHeader title="Marketing" subtitle="Testar muito, escalar só o que vence" aside={<BetaBadge />} />

      <Section title="Laboratório de criativos">
        <p className="px-1 text-sm text-text-2">
          Exemplo com os conceitos que vocês já têm. Quando a Meta Ads estiver conectada, cada card mostra gasto e custo por
          conversa, e o agente move entre as colunas.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {COLUNAS.map((col) => (
            <GlassCard key={col.titulo} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-text">
                {col.titulo} <span className="ml-1 font-mono text-text-3">{col.itens.length}</span>
              </p>
              {col.itens.length === 0 ? (
                <p className="text-sm text-text-3">Nada aqui ainda.</p>
              ) : (
                col.itens.map((c) => (
                  <div key={c.gancho} className="rounded-md border border-line bg-glass-strong p-3">
                    <p className="text-sm font-medium text-text">{c.gancho}</p>
                    <p className="mt-1 text-xs text-text-2">
                      {c.angulo} · {c.formato}
                    </p>
                  </div>
                ))
              )}
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Regras de escala">
        <GlassCard>
          <p className="mb-3 text-sm text-text-2">
            O agente de anúncios só age com regras escritas por vocês. Preencham os números e ele passa a seguir.
          </p>
          <ul className="space-y-2 text-sm text-text">
            {REGRAS.map((r) => (
              <li key={r} className="rounded-md bg-mist-1 px-3 py-2">
                {r}
              </li>
            ))}
          </ul>
        </GlassCard>
      </Section>

      <Section title="Ritmo de conteúdo">
        <div className="grid gap-3 md:grid-cols-2">
          <GlassCard>
            <p className="font-semibold text-text">Feed</p>
            <p className="text-sm text-text-2">1 post por semana, na sexta. Mix de educação, dor, IA aplicada e autoridade.</p>
          </GlassCard>
          <GlassCard>
            <p className="font-semibold text-text">Stories</p>
            <p className="text-sm text-text-2">
              Quadro de mercado imobiliário: 1 notícia e 1 provocação por dia, nas janelas em que o dono de imobiliária está
              no celular.
            </p>
          </GlassCard>
        </div>
      </Section>

      <AgentSection pilar="marketing" />
    </Page>
  );
}
