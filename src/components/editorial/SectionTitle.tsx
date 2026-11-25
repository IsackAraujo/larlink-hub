export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mb-3 border-b border-ink pb-1.5 text-[21px] font-semibold ${className}`}>{children}</h2>;
}
