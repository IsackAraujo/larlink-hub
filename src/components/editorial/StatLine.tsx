export function StatLine({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p className="font-mono text-[13px] uppercase">
      {label}: <b className="normal-case">{value}</b>
    </p>
  );
}
