import type { ButtonHTMLAttributes } from "react";

export function RetroButton({ className = "", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`min-h-9 cursor-pointer rounded-ed border border-ink bg-paper-2 px-2.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[.08em] text-ink shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${className}`}
      {...props}
    />
  );
}
