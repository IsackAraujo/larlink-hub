"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Segmented } from "@/components/ui/Segmented";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Mode = "entrar" | "primeiro";

const MIN_PASSWORD = 8;

function friendlyError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("database error") || m.includes("não autorizado") || m.includes("signups not allowed"))
    return "Esse e-mail não tem acesso ao Larlink Hub. Fale com o Isack.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Você já criou sua senha. Use a aba Entrar.";
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Conta criada, mas falta liberar o acesso sem confirmação de e-mail. Fale com o Isack.";
  if (m.includes("password")) return `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`;
  if (m.includes("rate limit") || m.includes("security purposes"))
    return "Muitas tentativas seguidas. Espere um minuto e tente de novo.";
  return "Não deu certo agora. Tente de novo em instantes.";
}

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(initialError);

  const isFirst = mode === "primeiro";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    if (isFirst && password !== confirm) return setError("As duas senhas não são iguais.");
    if (isFirst && password.length < MIN_PASSWORD)
      return setError(`A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`);

    setLoading(true);
    const supabase = createClient();
    const credentials = { email: email.trim().toLowerCase(), password };

    if (isFirst) {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) {
        setLoading(false);
        return setError(friendlyError(error.message));
      }
      if (!data.session) {
        // Supabase ainda exige confirmação por e-mail: tenta entrar direto para mostrar a mensagem certa.
        const { error: signInError } = await supabase.auth.signInWithPassword(credentials);
        if (signInError) {
          setLoading(false);
          return setError(friendlyError(signInError.message));
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) {
        setLoading(false);
        return setError(friendlyError(error.message));
      }
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <Segmented
        label="Como entrar"
        value={mode}
        onChange={(v) => {
          setMode(v);
          setError(undefined);
        }}
        options={[
          { value: "entrar", label: "Entrar" },
          { value: "primeiro", label: "Primeiro acesso" },
        ]}
      />
      <Field label="Seu e-mail">
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
      </Field>
      <Field label={isFirst ? "Crie uma senha" : "Senha"} hint={isFirst ? `Mínimo de ${MIN_PASSWORD} caracteres.` : undefined}>
        <Input
          type="password"
          autoComplete={isFirst ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={isFirst ? MIN_PASSWORD : undefined}
          required
        />
      </Field>
      {isFirst && (
        <Field label="Repita a senha">
          <Input
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </Field>
      )}
      {error && (
        <p role="alert" className="text-sm text-err">
          {error}
        </p>
      )}
      <Button type="submit" block disabled={loading || !email || !password}>
        {loading ? "Entrando…" : isFirst ? "Criar senha e entrar" : "Entrar"}
      </Button>
      <p className="text-center text-sm text-text-3">
        {isFirst ? "Só e-mails convidados pela Larlink conseguem criar conta." : "Primeira vez aqui? Toque em Primeiro acesso."}
      </p>
    </form>
  );
}
