"use client";

import { createClientAccount } from "@/app/(gestao)/clientes/actions";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useRef, useState, useTransition } from "react";

export function NewClientForm() {
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
            const res = await createClientAccount(fd);
            if (res.error) return setError(res.error);
            setError(undefined);
            ref.current?.reset();
            toast("Cliente cadastrado.");
          })
        }
        className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-end"
      >
        <Field label="Cliente">
          <Input name="nome" placeholder="Ex.: ADR Imóveis" required />
        </Field>
        <Field label="Plano">
          <Input name="plano" placeholder="Essencial" />
        </Field>
        <Field label="Mensalidade (R$)">
          <Input name="valor_mensal" inputMode="decimal" placeholder="350" />
        </Field>
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando…" : "Cadastrar"}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-err md:col-span-4">
            {error}
          </p>
        )}
      </form>
    </GlassCard>
  );
}
