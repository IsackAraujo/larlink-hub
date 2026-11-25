export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-ink bg-paper px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[.08em]">{children}</span>
  );
}
