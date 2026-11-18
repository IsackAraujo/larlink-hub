import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Reflexo de sol passando. Use em no máximo 1 destaque por tela. */
  sheen?: boolean;
  /** Eleva ao passar/pressionar. */
  interactive?: boolean;
  strong?: boolean;
};

export function GlassCard({ sheen, interactive, strong, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "relative rounded-lg p-4 md:p-6",
        sheen && "sheen",
        interactive &&
          "cursor-pointer transition-[transform,box-shadow] duration-240 ease-out hover:shadow-2 active:scale-[0.99]",
        className,
      )}
      {...props}
    />
  );
}
