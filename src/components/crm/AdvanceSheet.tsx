"use client";

import { moveStage, type MoveStageInput } from "@/app/(sdr)/leads/actions";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Field } from "@/components/ui/Field";
import { Sheet } from "@/components/ui/Sheet";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { useState, useTransition } from "react";
import type { LeadItem } from "./LeadCard";

const CANAIS = [
  { id: "instagram", label: "Instagram" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "ligacao", label: "Ligação" },
  { id: "visita", label: "Visita" },
  { id: "email", label: "E-mail" },
  { id: "linkedin", label: "LinkedIn" },
];

/** Próximo passo do SDR para cada etapa que ele opera. */
export const NEXT_STEP: Partial<Record<LeadItem["etapa"], { to: MoveStageInput["to"]; button: string; title: string }>> = {
  prospect: { to: "contato_feito", button: "Abordei", title: "Registrar abordagem" },
  contato_feito: { to: "respondeu", button: "Respondeu", title: "O lead respondeu" },
  respondeu: { to: "com_isack", button: "Passar pro Isack", title: "Passar para o Isack" },
};

export function AdvanceSheet({ lead, onClose }: { lead: LeadItem | null; onClose: () => void }) {
  const toast = useToast();
  const [canal, setCanal] = useState("instagram");
  const [text, setText] = useState("");
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const step = lead ? NEXT_STEP[lead.etapa] : undefined;

  function close() {
    setText("");
    setError(undefined);
    onClose();
  }

  function submit() {
    if (!lead || !step) return;
    const data: Record<string, string> = { canal };
    if (step.to === "respondeu" && text.trim()) data.resumo = text.trim();
    if (step.to === "com_isack") {
      if (!text.trim()) return setError("Conte pro Isack o que rolou na conversa.");
      data.nota_passagem = text.trim();
    }
    setError(undefined);
    startTransition(async () => {
      const res = await moveStage({ leadId: lead.id, to: step.to, data });
      if (res.error) return setError(res.error);
      toast(step.to === "com_isack" ? "Passado pro Isack." : "Registrado.");
      close();
    });
  }

  return (
    <Sheet
      open={!!lead && !!step}
      onClose={close}
      title={step ? `${step.title} · ${lead?.imobiliaria ?? ""}` : ""}
      footer={
        <Button block onClick={submit} disabled={pending}>
          {pending ? "Salvando…" : "Confirmar"}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text">{step?.to === "contato_feito" ? "Por onde você abordou?" : "Por qual canal?"}</p>
          <div className="flex flex-wrap gap-2">
            {CANAIS.map((c) => (
              <Chip key={c.id} selected={canal === c.id} onClick={() => setCanal(c.id)}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>
        {step?.to === "respondeu" && (
          <Field label="O que ele respondeu? (opcional)">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} />
          </Field>
        )}
        {step?.to === "com_isack" && (
          <Field label="Nota para o Isack" hint="Quem é o contato, o interesse e o melhor horário.">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
          </Field>
        )}
        {error && (
          <p role="alert" className="text-sm text-err">
            {error}
          </p>
        )}
      </div>
    </Sheet>
  );
}
