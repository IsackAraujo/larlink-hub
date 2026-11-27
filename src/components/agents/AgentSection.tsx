import { Section } from "@/components/ui/Section";
import { agentesDo, type Pilar } from "@/lib/agentes/catalogo";
import Link from "next/link";
import { AgentCard } from "./AgentCard";

/** Bloco “Agentes em beta” no fim de cada módulo. */
export function AgentSection({ pilar }: { pilar: Pilar }) {
  const agentes = agentesDo(pilar);
  return (
    <Section
      title="Agentes em beta"
      count={agentes.length}
      action={
        <Link href="/agentes" className="text-sm font-medium text-ink underline-offset-4 hover:underline">
          Ver todos
        </Link>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        {agentes.map((a) => (
          <AgentCard key={a.id} agente={a} />
        ))}
      </div>
    </Section>
  );
}
