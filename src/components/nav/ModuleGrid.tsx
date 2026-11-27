import { BetaBadge } from "@/components/ui/BetaBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { MODULOS } from "@/lib/nav/modulos";
import Link from "next/link";

export function ModuleGrid({ skip }: { skip?: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {MODULOS.filter((m) => m.href !== skip).map(({ href, label, descricao, icon: Icon, beta }) => (
        <Link key={href} href={href} className="block">
          <GlassCard interactive className="flex h-full items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-ink/10 text-ink">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="flex items-center gap-2 font-semibold text-text">
                {label} {beta && <BetaBadge className="h-5 px-2 text-[9px]" />}
              </span>
              <span className="text-sm text-text-2">{descricao}</span>
            </span>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
