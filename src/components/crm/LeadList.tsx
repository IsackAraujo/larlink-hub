"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Segmented } from "@/components/ui/Segmented";
import { Users } from "lucide-react";
import { useMemo, useState } from "react";
import { AdvanceSheet, NEXT_STEP } from "./AdvanceSheet";
import { LeadCard, type LeadItem } from "./LeadCard";

type Filter = "prospect" | "contato_feito" | "respondeu" | "todos";

export function LeadList({ leads }: { leads: LeadItem[] }) {
  const [filter, setFilter] = useState<Filter>("prospect");
  const [active, setActive] = useState<LeadItem | null>(null);

  const count = (f: Filter) => (f === "todos" ? leads.length : leads.filter((l) => l.etapa === f).length);
  const shown = useMemo(() => (filter === "todos" ? leads : leads.filter((l) => l.etapa === filter)), [leads, filter]);

  return (
    <>
      <Segmented
        label="Filtrar por etapa"
        value={filter}
        onChange={setFilter}
        className="overflow-x-auto"
        options={[
          { value: "prospect", label: "A abordar", count: count("prospect") },
          { value: "contato_feito", label: "Abordados", count: count("contato_feito") },
          { value: "respondeu", label: "Responderam", count: count("respondeu") },
          { value: "todos", label: "Todos", count: count("todos") },
        ]}
      />
      {shown.length === 0 ? (
        <GlassCard>
          <EmptyState icon={Users} title="Nada aqui" description="Nenhum lead nesta etapa agora." />
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {shown.map((lead) => {
            const step = NEXT_STEP[lead.etapa];
            return (
              <LeadCard
                key={lead.id}
                lead={lead}
                action={
                  step && (
                    <Button className="ml-auto" onClick={() => setActive(lead)}>
                      {step.button}
                    </Button>
                  )
                }
              />
            );
          })}
        </div>
      )}
      <AdvanceSheet lead={active} onClose={() => setActive(null)} />
    </>
  );
}
