import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Agente } from "@/lib/agentes/catalogo";
import { Bot } from "lucide-react";

const autonomiaLabel: Record<Agente["autonomia"], string> = {
  sugere: "Sugere",
  "age com aprovação": "Age com sua aprovação",
  "age sozinho": "Age sozinho",
};

export function AgentCard({ agente }: { agente: Agente }) {
  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-ink/10 text-ink">
            <Bot size={20} strokeWidth={1.75} />
          </span>
          <p className="text-[16px] font-semibold text-text">{agente.nome}</p>
        </div>
        <BetaBadge />
      </div>
      <p className="text-sm text-text">{agente.oQueFaz}</p>
      <p className="text-sm text-text-2">
        <span className="font-medium text-text">Por que importa: </span>
        {agente.impacto}
      </p>
      <p className="text-sm text-text-2">
        <span className="font-medium text-text">Precisa de: </span>
        {agente.precisa}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-text-2">
        <span className="rounded-pill bg-mist-1 px-2.5 py-1">Esforço {agente.esforco}</span>
        <span className="rounded-pill bg-mist-1 px-2.5 py-1">{autonomiaLabel[agente.autonomia]}</span>
      </div>
    </GlassCard>
  );
}
