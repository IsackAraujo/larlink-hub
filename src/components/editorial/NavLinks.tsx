"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/painel", label: "Painel" },
  { href: "/vendas", label: "Vendas" },
  { href: "/marketing", label: "Marketing" },
  { href: "/produto", label: "Produto" },
  { href: "/clientes", label: "Clientes" },
  { href: "/gestao", label: "Gestão" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-3.5 font-mono text-xs uppercase tracking-[.08em]" aria-label="Módulos">
      {LINKS.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={active ? "font-bold underline" : "no-underline hover:underline"}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
