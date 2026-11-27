"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { createClient } from "@/lib/supabase/client";
import { useState, type FormEvent } from "react";

const MIN_PASSWORD = 8;

export function ChangePasswordForm() {
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    if (password.length < MIN_PASSWORD) return setError(`Mínimo de ${MIN_PASSWORD} caracteres.`);
    if (password !== confirm) return setError("As duas senhas não são iguais.");
    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
    setLoading(false);
    if (error) return setError("Não deu para trocar a senha agora. Tente de novo.");
    setPassword("");
    setConfirm("");
    toast("Senha trocada.");
  }

  return (
    <GlassCard>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <p className="font-semibold text-text">Trocar senha</p>
        <Field label="Nova senha">
          <Input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        <Field label="Repita a nova senha" error={error}>
          <Input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </Field>
        <Button type="submit" variant="glass" block disabled={loading || !password}>
          {loading ? "Salvando…" : "Salvar nova senha"}
        </Button>
      </form>
    </GlassCard>
  );
}
