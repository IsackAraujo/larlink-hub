import type { ActivityLine } from "@/lib/painel/types";

export function TerminalBar({ lines }: { lines: ActivityLine[] }) {
  return (
    <div className="bg-terminal px-5 py-2.5 font-mono text-xs leading-relaxed text-terminal-fg" role="log" aria-label="Atividade recente">
      {lines.map((line, i) => (
        <p key={line.id} className="terminal-line m-0" style={{ animationDelay: `${i * 250}ms` }}>
          &gt; {line.text}
        </p>
      ))}
    </div>
  );
}
