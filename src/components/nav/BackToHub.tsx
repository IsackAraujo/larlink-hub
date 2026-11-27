import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";

/** Faixa fixa no topo quando a gestão está olhando a área do Luiz. */
export function BackToHub() {
  return (
    <div className="sticky top-0 z-40 px-3 pt-[max(env(safe-area-inset-top),8px)]">
      <div className="glass-solid mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-pill py-1.5 pr-1.5 pl-4">
        <span className="flex items-center gap-2 text-sm text-text-2">
          <Eye size={16} strokeWidth={1.75} /> Você está vendo como o Luiz
        </span>
        <Link
          href="/painel"
          className="inline-flex h-11 items-center gap-1.5 rounded-pill bg-ink px-4 text-sm font-medium text-white md:h-9"
        >
          <ArrowLeft size={16} strokeWidth={1.75} /> Voltar ao Hub
        </Link>
      </div>
    </div>
  );
}
