import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leads" };

export default function PageLeads() {
  return (
    <Page>
      <PageHeader title="Leads" />
      <GlassCard>
        <EmptyState icon={Users} title="Em construção" description="A lista dos seus leads chega na próxima entrega." />
      </GlassCard>
    </Page>
  );
}
