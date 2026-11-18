/**
 * Espelho de exibição do funil. A validação real está na RPC `mover_etapa()`.
 * Fonte: docs/produto/funil-e-regras.md
 */
export const ETAPAS = [
  { id: "prospect", label: "Prospect", dono: "sdr", tone: "neutral" },
  { id: "contato_feito", label: "Entrou em contato", dono: "sdr", tone: "info" },
  { id: "respondeu", label: "Obteve resposta", dono: "sdr", tone: "ink" },
  { id: "com_isack", label: "Com o Isack", dono: "gestao", tone: "sun" },
  { id: "reuniao_marcada", label: "Reunião marcada", dono: "gestao", tone: "lavender" },
  { id: "contrato_fechado", label: "Contrato fechado", dono: "gestao", tone: "ok" },
] as const;

export const PERDIDO = { id: "perdido", label: "Perdido", dono: "gestao", tone: "err" } as const;

export type EtapaId = (typeof ETAPAS)[number]["id"] | typeof PERDIDO.id;
export type EtapaTone = (typeof ETAPAS)[number]["tone"] | typeof PERDIDO.tone;

const ALL = [...ETAPAS, PERDIDO];

export function getEtapa(id: EtapaId) {
  return ALL.find((e) => e.id === id)!;
}

/** Etapas que o SDR enxerga e opera. */
export const ETAPAS_SDR = ETAPAS.filter((e) => e.dono === "sdr");
