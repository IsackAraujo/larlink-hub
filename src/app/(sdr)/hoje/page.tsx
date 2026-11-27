import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Section } from "@/components/ui/Section";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { startOfTodaySP, endOfTodaySP, greetingSP } from "@/lib/time";
import { Sun } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Hoje" };

const META_DIARIA = 6; // TODO(G-06): ler de `metas`

export default async function HojePage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const [{ count: abordagens }, { count: followUps }] = await Promise.all([
    supabase
      .from("lead_eventos")
      .select("id", { count: "exact", head: true })
      .eq("autor_id", user.id)
      .eq("tipo", "etapa")
      .eq("para_etapa", "contato_feito")
      .gte("criado_em", startOfTodaySP()),
    supabase
      .from("tarefas")
      .select("id", { count: "exact", head: true })
      .eq("atribuida_a", user.id)
      .is("concluida_em", null)
      .is("cancelada_em", null)
      .lte("vence_em", endOfTodaySP()),
  ]);

  const feitas = abordagens ?? 0;
  const faltam = Math.max(META_DIARIA - feitas, 0);

  return (
    <Page>
      <PageHeader
        title="Hoje"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            {greetingSP()}, {user.nome} <Sun size={14} strokeWidth={1.75} className="text-sun" />
          </span>
        }
      />

      <GlassCard sheen>
        <ProgressRing
          value={feitas}
          max={META_DIARIA}
          label="Novas abordagens"
          hint={faltam === 0 ? "O que vier agora é bônus" : `Faltam ${faltam} para a meta`}
        />
      </GlassCard>

      <Section title="Follow-ups" count={followUps ?? 0}>
        <GlassCard>
          <EmptyState
            icon={Sun}
            title="Sem follow-ups hoje"
            description="Quando você registrar abordagens, os follow-ups aparecem aqui sozinhos."
            action={
              <Link href="/leads" className="inline-flex h-11 items-center rounded-pill bg-sun px-5 text-[15px] font-medium text-ink-deep shadow-1">
                Abordar agora
              </Link>
            }
          />
        </GlassCard>
      </Section>
    </Page>
  );
}
