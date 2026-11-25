import { PaperPanel } from "./PaperPanel";

type Props = { label: string; current: number; target: number; deadline: string };

function daysUntil(isoDate: string): number {
  const ms = new Date(`${isoDate}T23:59:59-03:00`).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function GoalCard({ label, current, target, deadline }: Props) {
  const remaining = Math.max(0, target - current);
  return (
    <PaperPanel>
      <p className="font-mono text-[11px] uppercase tracking-[.08em]">{label}</p>
      <p className="my-2 text-[52px] font-bold leading-none">
        {current}
        <span className="text-[26px] text-muted"> / {target}</span>
      </p>
      <div className="flex gap-1" role="img" aria-label={`${current} de ${target} clientes`}>
        {Array.from({ length: target }, (_, i) => (
          <span key={i} className={`h-2.5 flex-1 border border-ink ${i < current ? "bg-sun" : ""}`} />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">
        FALTAM {remaining} · {daysUntil(deadline)} DIAS
      </p>
    </PaperPanel>
  );
}
