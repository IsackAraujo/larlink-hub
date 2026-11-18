import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";
import { controlClass } from "./controlStyles";

export function Textarea({ className, rows = 3, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} className={cn(controlClass, "resize-none py-2.5", className)} {...props} />;
}
