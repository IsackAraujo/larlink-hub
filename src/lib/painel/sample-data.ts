import type { ActivityLine, PainelData } from "./types";

// Dados de exemplo até o Supabase entrar (F-02 / C-01). Trocar por leituras em Server Components.

export function getActivityLog(): ActivityLine[] {
  return [
    { id: "1", text: "Luiz moveu Imobiliária Vale Azul para Reunião marcada." },
    { id: "2", text: "Follow-up de Litoral Imóveis venceu hoje às 10h." },
    { id: "3", text: "Post de sexta (mercado imobiliário) está agendado." },
    { id: "4", text: "ADR: 12 leads atendidos pela IA nos últimos 7 dias." },
    { id: "5", text: "Resumo semanal da gestão pronto para a weekly." },
  ];
}

export function getPainelData(): PainelData {
  return {
    goal: { current: 1, target: 5, deadline: "2026-12-31" },
    business: { mrr: "R$ 450", activeClients: 2, leadsInFunnel: 41, callsThisWeek: 3 },
    sdr: {
      approachesToday: 4,
      dailyTarget: 6,
      repliesThisWeek: 7,
      handedOff: 2,
      alert: "Dois leads com o Isack há mais de 3 dias sem follow-up.",
    },
    tasks: [
      { id: "t1", title: "Follow-up das 4 imobiliárias visitadas", description: "Mandar material de valor e chegar em planos", tag: "Vendas", owner: "Isack" },
      { id: "t2", title: "Onboarding da M & WFA", description: "Configurar disparo de campanhas para corretores", tag: "Produto", owner: "Pedro" },
      { id: "t3", title: "Lista premium para o Luiz", description: "Só imobiliárias com mais de 10 mil seguidores", tag: "SDR", owner: "Isack" },
      { id: "t4", title: "Contrato e cobrança da ADR", description: "Conferir assinatura e primeiro pagamento", tag: "Clientes", owner: "Alexandre" },
    ],
    backlogCount: 6,
    funnel: [
      { label: "Prospect", count: 18 },
      { label: "Entrou em contato", count: 10 },
      { label: "Obteve resposta", count: 7 },
      { label: "Com o Isack", count: 3 },
      { label: "Reunião marcada", count: 2 },
      { label: "Contrato fechado", count: 1 },
    ],
    marketing: {
      handle: "@larlink.br",
      nextPost: "Post de sexta: o que muda para imobiliárias quando o lead chega pronto pro corretor.",
      nextPostWhen: "Agendado · sex 09:00",
      stories: "8 / 10",
      metaAds: "pausado",
    },
    clients: [
      { name: "ADR", fee: "R$ 350/MÊS", note: "IA no WhatsApp ativa. Manter engajamento." },
      { name: "M & WFA", fee: "R$ 100 + ENVIOS", note: "Campanhas para corretores. Em implantação." },
    ],
    docs: [
      { name: "Larlink — contexto de GTM", updatedLabel: "há 2 d" },
      { name: "Template de contrato", updatedLabel: "há 1 sem" },
      { name: "Guia de estilo v1.2", updatedLabel: "há 3 sem" },
      { name: "Apresentação Larlink v2", updatedLabel: "há 1 mês" },
    ],
    docsTotal: 9,
  };
}
