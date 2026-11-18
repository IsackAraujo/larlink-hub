import type { ReactNode } from "react";

/** Rótulo + dica + erro em volta de um controle. */
export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text">{label}</span>
      {children}
      {error ? (
        <span className="text-sm text-err">{error}</span>
      ) : (
        hint && <span className="text-sm text-text-2">{hint}</span>
      )}
    </label>
  );
}
