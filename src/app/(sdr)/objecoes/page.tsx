import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { MessageCircleQuestion } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Objeções" };

export default function PageObjecoes() {
  return (
    <Page>
      <PageHeader title="Objeções" />
      <GlassCard>
        <EmptyState icon={MessageCircleQuestion} title="Em construção" description="A biblioteca de objeções chega em breve." />
      </GlassCard>
    </Page>
  );
}
