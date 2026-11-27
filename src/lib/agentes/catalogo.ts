/**
 * Catálogo de agentes em beta. Tudo aqui é viável com a stack que a Larlink já tem:
 * n8n no servidor, Claude API, Supabase (pg_cron + Edge Functions), WhatsApp do produto,
 * Meta Ads API e Instagram. Nenhum agente roda ainda: é o mapa do que construir.
 */
export type Pilar = "comercial" | "marketing" | "clientes" | "produto" | "gestao";
export type Esforco = "baixo" | "médio" | "alto";

export type Agente = {
  id: string;
  pilar: Pilar;
  nome: string;
  oQueFaz: string;
  impacto: string;
  precisa: string;
  esforco: Esforco;
  /** Começa só sugerindo; só depois de confiável passa a agir sozinho. */
  autonomia: "sugere" | "age com aprovação" | "age sozinho";
};

export const PILARES: Record<Pilar, string> = {
  comercial: "Comercial",
  marketing: "Marketing",
  clientes: "Sucesso do cliente",
  produto: "Produto",
  gestao: "Gestão",
};

export const AGENTES: Agente[] = [
  // Comercial
  {
    id: "prospector",
    pilar: "comercial",
    nome: "Prospector diário",
    oQueFaz:
      "Todo dia acha imobiliárias novas (Instagram e Google Maps), enriquece com seguidores, site, WhatsApp e tamanho, dá uma nota de ICP e coloca as melhores na lista do Luiz.",
    impacto: "O Luiz nunca fica sem lista boa. Você para de montar planilha na mão.",
    precisa: "O fluxo de prospecção do n8n que já existe, gravando direto na tabela de leads.",
    esforco: "baixo",
    autonomia: "age sozinho",
  },
  {
    id: "copiloto-abordagem",
    pilar: "comercial",
    nome: "Copiloto de abordagem",
    oQueFaz:
      "Lê a bio e os últimos posts da imobiliária e escreve a primeira DM personalizada. O Luiz revisa, copia e manda.",
    impacto: "Abordagem melhor em menos tempo: mais respostas com as mesmas 6 abordagens por dia.",
    precisa: "Claude API no servidor (já previsto como botão “Pedir sugestão”).",
    esforco: "baixo",
    autonomia: "sugere",
  },
  {
    id: "follow-up",
    pilar: "comercial",
    nome: "Follow-up no piloto automático",
    oQueFaz:
      "Quando um follow-up vence, já entrega a mensagem pronta no contexto da conversa e avisa o Luiz no celular.",
    impacto: "Nenhum lead esfria por esquecimento. É onde a maioria das vendas se perde.",
    precisa: "Cadências (já existem no banco) + Claude API + notificação no celular.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  {
    id: "prep-call",
    pilar: "comercial",
    nome: "Preparador de call",
    oQueFaz:
      "Uma hora antes da reunião, monta o dossiê: quem é a imobiliária, volume estimado de leads, objeções prováveis e as 3 perguntas certas.",
    impacto: "Você chega em toda call preparado sem gastar 30 minutos pesquisando.",
    precisa: "Dados do lead + Claude API + lembrete de reunião (já previsto).",
    esforco: "baixo",
    autonomia: "sugere",
  },
  {
    id: "call-para-crm",
    pilar: "comercial",
    nome: "Call → CRM",
    oQueFaz:
      "Transcreve a call, resume, registra objeções, sugere a próxima etapa e cria a tarefa de follow-up.",
    impacto: "Zero digitação depois da call. O funil se atualiza sozinho.",
    precisa: "Gravação da call (Meet/Zoom) + transcrição + Claude API.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  // Marketing
  {
    id: "fabrica-criativos",
    pilar: "marketing",
    nome: "Fábrica de criativos",
    oQueFaz:
      "Toda semana gera 20 variações de anúncio cruzando ângulos (dor, prova, novidade, medo de perder lead) com ganchos e formatos, usando as objeções reais do CRM como matéria-prima.",
    impacto: "Volume de teste de quem escala com VSL: muitos criativos baratos, poucos vencedores escalados.",
    precisa: "Claude API + objeções registradas pelo Luiz + seu pipeline de vídeo (Claude Design/ElevenLabs/CapCut).",
    esforco: "médio",
    autonomia: "sugere",
  },
  {
    id: "analista-ads",
    pilar: "marketing",
    nome: "Analista de anúncios diário",
    oQueFaz:
      "Lê a Meta Ads toda manhã: pausa o que passou do custo por conversa limite, sugere escalar os vencedores e manda um resumo de 5 linhas.",
    impacto: "Disciplina de mídia todo dia sem você abrir o gerenciador.",
    precisa: "Token da Meta Ads API + regras de corte e teto de orçamento definidos por você.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  {
    id: "vsl-landing",
    pilar: "marketing",
    nome: "Roteirista de VSL e landing",
    oQueFaz:
      "Escreve VSL curta e variações da landing (promessa, prova, oferta, garantia) e mede qual versão gera mais conversas no WhatsApp.",
    impacto: "Oferta testada com dados, não com achismo.",
    precisa: "Claude API + landing com variações (A/B) + evento de conversão.",
    esforco: "médio",
    autonomia: "sugere",
  },
  {
    id: "radar-concorrentes",
    pilar: "marketing",
    nome: "Radar de concorrentes",
    oQueFaz: "Monitora Instagram, site e anúncios dos concorrentes e manda o que mudou toda segunda.",
    impacto: "Você descobre ângulos e preços novos antes de perder venda por eles.",
    precisa: "n8n + Biblioteca de Anúncios da Meta + Claude API para resumir.",
    esforco: "baixo",
    autonomia: "age sozinho",
  },
  {
    id: "conteudo-mes",
    pilar: "marketing",
    nome: "Conteúdo do mês",
    oQueFaz:
      "Transforma notícias do mercado imobiliário em posts e stories no tom da Larlink e deixa tudo agendado para aprovação.",
    impacto: "Instagram ativo toda semana sem depender de inspiração.",
    precisa: "Fontes de notícia + Claude API + agendador do Instagram.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  // Sucesso do cliente
  {
    id: "relatorio-valor",
    pilar: "clientes",
    nome: "Relatório de valor mensal",
    oQueFaz:
      "Todo mês manda para cada imobiliária cliente quantos leads a IA atendeu, em quanto tempo e quantas visitas virou.",
    impacto: "Cliente que vê o valor não cancela. É a melhor arma contra churn.",
    precisa: "Métricas do produto (conversas do bot) + Claude API + envio no grupo do cliente.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  {
    id: "pulso-cliente",
    pilar: "clientes",
    nome: "Pulso do cliente",
    oQueFaz:
      "Detecta sinal de risco: queda de conversas, ninguém respondendo os leads, número sem uso. Alerta antes do cliente pensar em cancelar.",
    impacto: "Casos como a ADR sem ninguém chamando o número aparecem no mesmo dia.",
    precisa: "Leitura das métricas do produto + regra de saúde na tabela de clientes.",
    esforco: "médio",
    autonomia: "age sozinho",
  },
  {
    id: "onboarding",
    pilar: "clientes",
    nome: "Onboarding guiado",
    oQueFaz: "Conduz a implantação passo a passo no grupo do cliente e marca o checklist sozinho.",
    impacto: "Implantação em 4 dias sem você cobrar cada etapa.",
    precisa: "Checklist de implantação (já existe coluna no banco) + WhatsApp.",
    esforco: "alto",
    autonomia: "age com aprovação",
  },
  // Produto
  {
    id: "qa-conversas",
    pilar: "produto",
    nome: "QA das conversas do bot",
    oQueFaz:
      "Lê uma amostra de conversas reais por dia, dá nota com uma rubrica e aponta as respostas ruins com o trecho e a correção sugerida.",
    impacto: "O produto melhora toda semana com prova, não com reclamação de cliente.",
    precisa: "Acesso às conversas do produto + Claude API.",
    esforco: "médio",
    autonomia: "sugere",
  },
  {
    id: "feedback-backlog",
    pilar: "produto",
    nome: "Feedback → backlog",
    oQueFaz: "Junta pedidos e reclamações dos grupos de clientes e das calls, agrupa por tema e conta quantos pediram.",
    impacto: "Pedro e Alexandre priorizam pelo que mais dói no cliente.",
    precisa: "Exportação dos grupos ou resumos das calls + Claude API.",
    esforco: "médio",
    autonomia: "sugere",
  },
  // Gestão
  {
    id: "chief-of-staff",
    pilar: "gestao",
    nome: "Chief of staff diário",
    oQueFaz:
      "Às 7h manda para cada sócio as 3 coisas que importam hoje: leads quentes, clientes em risco, tarefas vencendo.",
    impacto: "Constância sem depender de força de vontade: o dia já começa decidido.",
    precisa: "Dados do Hub + pg_cron + notificação/WhatsApp.",
    esforco: "baixo",
    autonomia: "age sozinho",
  },
  {
    id: "secretario-weekly",
    pilar: "gestao",
    nome: "Secretário da weekly",
    oQueFaz:
      "Monta a pauta com os números da semana já calculados, registra decisões durante a reunião e cria as tarefas de cada um.",
    impacto: "A weekly de 40 minutos vira decisão, não leitura de planilha.",
    precisa: "Rituais (esta tela) + relatórios do Hub + Claude API.",
    esforco: "médio",
    autonomia: "age com aprovação",
  },
  {
    id: "cobrador-constancia",
    pilar: "gestao",
    nome: "Cobrador de constância",
    oQueFaz: "Confere se cada ritual e meta aconteceu e cobra no dia seguinte, com sequência de dias e ranking entre sócios.",
    impacto: "Processo que se mantém sozinho, mesmo nas semanas corridas.",
    precisa: "Rituais e metas no Hub + notificação.",
    esforco: "baixo",
    autonomia: "age sozinho",
  },
];

export function agentesDo(pilar: Pilar) {
  return AGENTES.filter((a) => a.pilar === pilar);
}
