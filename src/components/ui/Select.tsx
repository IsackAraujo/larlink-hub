import { cn } from "@/lib/cn";
import type { SelectHTMLAttributes } from "react";
import { controlClass } from "./controlStyles";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, "h-11 appearance-none", className)} {...props}>
      {children}
    </select>
  );
}
