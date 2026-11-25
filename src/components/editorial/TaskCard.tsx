import type { Task } from "@/lib/painel/types";
import { PaperPanel } from "./PaperPanel";
import { Tag } from "./Tag";

export function TaskCard({ title, description, tag, owner }: Task) {
  return (
    <PaperPanel className="px-3 py-2.5">
      <h3 className="text-[17px] font-bold leading-tight">{title}</h3>
      <p className="truncate text-[15px] text-muted">– {description}</p>
      <div className="mt-2 flex items-center justify-between">
        <Tag>{tag}</Tag>
        <span className="font-mono text-[11px] font-bold uppercase">{owner}</span>
      </div>
    </PaperPanel>
  );
}
