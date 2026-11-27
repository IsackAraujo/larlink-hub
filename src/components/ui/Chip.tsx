import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export function Chip({
  selected,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 rounded-pill border px-4 text-sm font-medium md:h-9",
        "transition-[background-color,border-color,transform] duration-150 ease-spring active:scale-[0.97]",
        selected
          ? "border-ink bg-ink text-white"
          : "border-line bg-glass text-text hover:border-ink/30",
        className,
      )}
      {...props}
    />
  );
}
