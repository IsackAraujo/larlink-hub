import type { DocItem } from "@/lib/painel/types";

export function DocList({ docs }: { docs: DocItem[] }) {
  return (
    <ul>
      {docs.map((doc) => (
        <li key={doc.name} className="flex justify-between gap-2 border-b border-rule-soft py-2 text-base">
          <span>{doc.name}</span>
          <span className="whitespace-nowrap font-mono text-[11px] uppercase text-muted">{doc.updatedLabel}</span>
        </li>
      ))}
    </ul>
  );
}
