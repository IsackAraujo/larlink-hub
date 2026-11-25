export function RetroButtonGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex [&>button+button]:-ml-px ${className}`}>{children}</div>;
}
