import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-pill bg-sun-soft text-sun">
        <Icon size={26} strokeWidth={1.75} />
      </span>
      <p className="text-[15px] font-semibold text-text">{title}</p>
      {description && <p className="max-w-xs text-sm text-text-2">{description}</p>}
      {action}
    </div>
  );
}
