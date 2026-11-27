import { ModuleGrid } from "@/components/nav/ModuleGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eye, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Mais" };

export default function MaisPage() {
  return (
    <Page>
      <PageHeader title="Hub" subtitle="Todos os módulos" />
      <ModuleGrid />
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/hoje">
          <GlassCard interactive className="flex items-center gap-3 font-semibold text-text">
            <Eye size={20} strokeWidth={1.75} /> Ver como o Luiz
          </GlassCard>
        </Link>
        <Link href="/conta">
          <GlassCard interactive className="flex items-center gap-3 font-semibold text-text">
            <User size={20} strokeWidth={1.75} /> Conta e senha
          </GlassCard>
        </Link>
      </div>
    </Page>
  );
}
