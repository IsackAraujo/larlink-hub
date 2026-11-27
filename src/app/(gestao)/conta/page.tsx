import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { signOut } from "@/app/auth/actions";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCurrentUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Conta" };

export default async function ContaPage() {
  const user = await getCurrentUser();
  return (
    <Page>
      <PageHeader title="Conta" />
      <GlassCard className="flex items-center gap-4">
        <Avatar name={user.nome} size={52} />
        <div className="min-w-0">
          <p className="text-lg font-semibold text-text">{user.nome}</p>
          <p className="truncate text-sm text-text-2">{user.email}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.06em] text-text-3">Gestão</p>
        </div>
      </GlassCard>
      <ChangePasswordForm />
      <Link href="/dev/ui" className="px-1 text-sm text-ink underline-offset-4 hover:underline">
        Ver vitrine do design system
      </Link>
      <form action={signOut}>
        <Button type="submit" variant="glass" block>
          <LogOut size={16} strokeWidth={1.75} /> Sair
        </Button>
      </form>
    </Page>
  );
}
