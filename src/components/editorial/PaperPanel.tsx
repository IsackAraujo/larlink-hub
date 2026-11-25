export function PaperPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-ed border-2 border-ink bg-paper-2 px-4 py-3 shadow-hard ${className}`}>{children}</div>
  );
}
