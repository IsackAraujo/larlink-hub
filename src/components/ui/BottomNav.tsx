"use client";

import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; icon: LucideIcon };

/** Barra inferior de vidro (mobile). Indicador ouro sob o item ativo. */
export function BottomNav({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "glass-solid fixed inset-x-3 bottom-[max(env(safe-area-inset-bottom),12px)] z-40 rounded-xl md:hidden",
        className,
      )}
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                  "transition-colors duration-150",
                  active ? "text-ink" : "text-text-3",
                )}
              >
                <Icon size={22} strokeWidth={1.75} />
                {label}
                <span
                  className={cn(
                    "absolute bottom-1.5 h-1 w-5 rounded-pill bg-sun transition-[opacity,transform] duration-240 ease-spring",
                    active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
