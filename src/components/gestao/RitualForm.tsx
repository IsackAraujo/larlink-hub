"use client";

import { saveRitual } from "@/app/(gestao)/gestao/actions";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { useRef, useState, useTransition } from "react";

export function RitualForm() {
  const toast = useToast();
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();

  return (
    <GlassCard>
      <form
        ref={ref}
        action={(fd) =>
          start(async () => {
            const res = await saveRitual(fd);
            if (res.error) return setError(res.error);
            setError(undefined);
            ref.current?.reset();
            toast("Ritual criado.");
          })
        }
        className="grid gap-4 md:grid-cols-3"
      >
        <Field label="Nome do ritual">
          <Input name="titulo" placeholder="Ex.: Review de anúncios" required />
        </Field>
        <Field label="Frequência">
          <Select name="frequencia" defaultValue="semanal">
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="quinzenal">Quinzenal</option>
            <option value="mensal">Mensal</option>
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Quando">
            <Input name="quando" placeholder="sexta 18h" />
          </Field>
          <Field label="Minutos">
            <Input name="duracao_min" inputMode="numeric" placeholder="30" />
          </Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Pauta" hint="Um item por linha.">
            <Textarea name="pauta" rows={3} />
          </Field>
        </div>
        {error && (
          <p role="alert" className="text-sm text-err md:col-span-3">
            {error}
          </p>
        )}
        <div className="md:col-span-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Salvando…" : "Adicionar ritual"}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
