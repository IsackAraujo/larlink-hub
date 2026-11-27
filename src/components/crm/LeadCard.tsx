import { GlassCard } from "@/components/ui/GlassCard";
import { StageBadge } from "@/components/ui/StageBadge";
import type { EtapaId } from "@/lib/funil/etapas";
import { AtSign } from "lucide-react";
import type { ReactNode } from "react";

export type LeadItem = {
  id: string;
  imobiliaria: string;
  cidade: string | null;
  uf: string | null;
  instagram: string | null;
  seguidores: number | null;
  observacoes: string | null;
  etapa: EtapaId;
};

const nf = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });

function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle.replace(/^@/, "").trim()}/`;
}

export function LeadCard({ lead, action }: { lead: LeadItem; action?: ReactNode }) {
  const place = [lead.cidade, lead.uf].filter(Boolean).join(" · ");
  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[17px] font-semibold text-text">{lead.imobiliaria}</p>
          {place && <p className="truncate text-sm text-text-2">{place}</p>}
        </div>
        <StageBadge etapa={lead.etapa} className="shrink-0" />
      </div>
      {lead.observacoes && <p className="text-sm text-text-2">{lead.observacoes}</p>}
      <div className="flex flex-wrap items-center gap-2">
        {lead.instagram && (
          <a
            href={instagramUrl(lead.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-1.5 rounded-pill border border-line bg-glass px-4 text-sm font-medium text-text md:h-9"
          >
            <AtSign size={16} strokeWidth={1.75} />
            {lead.instagram.replace(/^@/, "")}
            {lead.seguidores != null && (
              <span className="font-mono text-xs tabular-nums text-text-3">{nf.format(lead.seguidores)}</span>
            )}
          </a>
        )}
        {action}
      </div>
    </GlassCard>
  );
}
