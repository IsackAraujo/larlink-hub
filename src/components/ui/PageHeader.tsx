import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  aside,
}: {
  title: string;
  subtitle?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="enter flex items-end justify-between gap-4 pt-2">
      <div>
        {subtitle && <p className="text-sm text-text-2">{subtitle}</p>}
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-text md:text-[34px]">{title}</h1>
      </div>
      {aside}
    </header>
  );
}
