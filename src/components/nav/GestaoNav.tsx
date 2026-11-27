"use client";

import { BottomNav } from "@/components/ui/BottomNav";
import { cn } from "@/lib/cn";
import { Briefcase, Eye, LayoutDashboard, Megaphone, Package, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: LucideIcon; soon?: boolean };

const items: Item[] = [
  { href: "/painel", label: "Painel", icon: LayoutDashboard },
  { href: "/vendas", label: "Vendas", icon: Briefcase, soon: true },
  { href: "/marketing", label: "Marketing", icon: Megaphone, soon: true },
  { href: "/produto", label: "Produto", icon: Package, soon: true },
  { href: "/clientes", label: "Clientes", icon: Users, soon: true },
];

/** Sidebar de vidro no desktop; barra inferior no celular. */
export function GestaoNav({ nome }: { nome: string }) {
  const pathname = usePathname();
  return (
    <>
      <aside className="glass fixed inset-y-4 left-4 z-30 hidden w-60 flex-col rounded-xl p-4 md:flex">
        <p className="px-3 pt-2 pb-6 text-sm font-medium uppercase tracking-[0.18em] text-text-3">Larlink Hub</p>
        <nav aria-label="Módulos" className="flex flex-1 flex-col gap-1">
          {items.map(({ href, label, icon: Icon, soon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={soon ? "#" : href}
                aria-disabled={soon}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-150",
                  active ? "bg-ceramic text-ink shadow-1" : "text-text-2 hover:bg-glass",
                  soon && "pointer-events-none opacity-50",
                )}
              >
                <Icon size={18} strokeWidth={1.75} className={active ? "text-sun" : undefined} />
                {label}
                {soon && <span className="ml-auto text-[10px] uppercase tracking-wider text-text-3">em breve</span>}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/hoje"
          className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-text-2 hover:bg-glass"
        >
          <Eye size={18} strokeWidth={1.75} /> Ver como o SDR
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
          { href: "/hoje", label: "Visão SDR", icon: Eye },
          { href: "/conta", label: "Conta", icon: Users },
        ]}
      />
    </>
  );
}
