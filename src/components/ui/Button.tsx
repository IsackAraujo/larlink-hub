import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "sun" | "ghost" | "glass";
type Size = "md" | "sm";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  block?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-1 hover:bg-ink-deep",
  sun: "bg-sun text-ink-deep shadow-1 hover:brightness-105",
  ghost: "bg-transparent text-ink hover:bg-glass",
  glass: "glass text-ink hover:bg-glass-strong",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px] md:h-10",
  sm: "h-9 px-3.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 rounded-pill font-medium",
        "transition-[transform,background-color,filter] duration-150 ease-spring active:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      {...props}
    />
  );
}
