import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

/** Contêiner de tela: largura confortável, safe areas e espaço para a BottomNav. */
export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 md:px-8",
        "pt-[max(env(safe-area-inset-top),20px)] pb-[calc(env(safe-area-inset-bottom)+96px)] md:pb-12",
        className,
      )}
      {...props}
    />
  );
}
