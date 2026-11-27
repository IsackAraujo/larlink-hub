import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { signOut } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Eu" };

export default async function EuPage() {
  const user = await getCurrentUser();
  return (
    <Page>
      <PageHeader title="Eu" />
      <GlassCard className="flex items-center gap-4">
        <Avatar name={user.nome} size={52} />
        <div className="min-w-0">
          <p className="text-lg font-semibold text-text">{user.nome}</p>
          <p className="truncate text-sm text-text-2">{user.email}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.06em] text-text-3">
            {user.papel === "sdr" ? "SDR" : "Gestão"}
          </p>
        </div>
      </GlassCard>
      <ChangePasswordForm />
      <p className="px-1 text-sm text-text-2">Pontos, sequência e conquistas chegam aqui em breve.</p>
      <form action={signOut}>
        <Button type="submit" variant="glass" block>
          <LogOut size={16} strokeWidth={1.75} /> Sair
        </Button>
      </form>
    </Page>
  );
}
