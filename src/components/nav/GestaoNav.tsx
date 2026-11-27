"use client";

import { BetaBadge } from "@/components/ui/BetaBadge";
import { BottomNav } from "@/components/ui/BottomNav";
import { cn } from "@/lib/cn";
import { MODULOS } from "@/lib/nav/modulos";
import { Bot, Briefcase, Eye, LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sidebar de vidro no desktop; barra inferior no celular. */
export function GestaoNav({ nome }: { nome: string }) {
  const pathname = usePathname();
  return (
    <>
      <aside className="glass fixed inset-y-4 left-4 z-30 hidden w-60 flex-col rounded-xl p-4 md:flex">
        <Link href="/painel" className="px-3 pt-2 pb-6 text-sm font-medium uppercase tracking-[0.18em] text-text-3">
          Larlink Hub
        </Link>
        <nav aria-label="Módulos" className="flex flex-1 flex-col gap-1">
          {MODULOS.map(({ href, label, icon: Icon, beta }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-150",
                  active ? "bg-ceramic text-ink shadow-1" : "text-text-2 hover:bg-glass",
                )}
              >
                <Icon size={18} strokeWidth={1.75} className={active ? "text-sun" : undefined} />
                {label}
                {beta && <BetaBadge className="ml-auto h-5 px-2 text-[9px]" />}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/hoje"
          className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-text-2 hover:bg-glass"
        >
          <Eye size={18} strokeWidth={1.75} /> Ver como o Luiz
        </Link>
        <Link href="/conta" className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-text hover:bg-glass">
          <span className="flex size-8 items-center justify-center rounded-pill bg-ink text-xs font-medium text-white">
            {nome.slice(0, 1).toUpperCase()}
          </span>
          {nome}
        </Link>
      </aside>
      <BottomNav
        items={[
          { href: "/painel", label: "Painel", icon: LayoutDashboard },
          { href: "/comercial", label: "Comercial", icon: Briefcase },
          { href: "/agentes", label: "Agentes", icon: Bot },
          { href: "/mais", label: "Mais", icon: Menu },
        ]}
      />
    </>
  );
}
