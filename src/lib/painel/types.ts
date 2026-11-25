export type ActivityLine = { id: string; text: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  tag: string;
  owner: string;
};

export type FunnelStage = { label: string; count: number };

export type DocItem = { name: string; updatedLabel: string };

export type PainelData = {
  goal: { current: number; target: number; deadline: string };
  business: { mrr: string; activeClients: number; leadsInFunnel: number; callsThisWeek: number };
  sdr: { approachesToday: number; dailyTarget: number; repliesThisWeek: number; handedOff: number; alert: string };
  tasks: Task[];
  backlogCount: number;
  funnel: FunnelStage[];
  marketing: { handle: string; nextPost: string; nextPostWhen: string; stories: string; metaAds: string };
  clients: { name: string; fee: string; note: string }[];
  docs: DocItem[];
  docsTotal: number;
};
