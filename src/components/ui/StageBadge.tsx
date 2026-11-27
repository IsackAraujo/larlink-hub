import { cn } from "@/lib/cn";
import { getEtapa, type EtapaId, type EtapaTone } from "@/lib/funil/etapas";

const tones: Record<EtapaTone, { dot: string; text: string; bg: string }> = {
  neutral: { dot: "bg-text-3", text: "text-text-2", bg: "bg-mist-1" },
  info: { dot: "bg-info", text: "text-info", bg: "bg-info/10" },
  ink: { dot: "bg-ink", text: "text-ink", bg: "bg-ink/10" },
  sun: { dot: "bg-sun", text: "text-ink-deep", bg: "bg-sun-soft" },
  lavender: { dot: "bg-lavender", text: "text-lavender", bg: "bg-lavender/10" },
  ok: { dot: "bg-ok", text: "text-ok", bg: "bg-ok/10" },
  err: { dot: "bg-err/70", text: "text-err", bg: "bg-err/10" },
};

export function StageBadge({ etapa, className }: { etapa: EtapaId; className?: string }) {
  const e = getEtapa(etapa);
  const t = tones[e.tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5 text-xs font-medium",
        t.bg,
        t.text,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", t.dot)} />
      {e.label}
    </span>
  );
}
