"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Step = "email" | "code";

function friendlyError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("database error") || m.includes("não autorizado") || m.includes("signups not allowed"))
    return "Esse e-mail não tem acesso ao Larlink Hub. Fale com o Isack.";
  if (m.includes("rate limit") || m.includes("security purposes"))
    return "Muitas tentativas seguidas. Espere um minuto e tente de novo.";
  if (m.includes("expired") || m.includes("invalid"))
    return "Código inválido ou expirado. Peça um novo.";
  return "Não deu certo agora. Tente de novo em instantes.";
}

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(initialError);

  async function sendEmail(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) return setError(friendlyError(error.message));
    setStep("code");
  }

  async function verifyCode(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setLoading(false);
      return setError(friendlyError(error.message));
    }
    router.replace("/");
    router.refresh();
  }

  if (step === "code") {
    return (
      <form onSubmit={verifyCode} className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-sun-soft text-sun">
            <MailCheck size={22} strokeWidth={1.75} />
          </span>
          <p className="text-[15px] text-text-2">
            Mandamos um e-mail para <strong className="font-semibold text-text">{email}</strong>. Toque no
            link ou digite o código aqui.
          </p>
        </div>
        <Field label="Código" error={error}>
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={8}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="text-center font-mono text-xl tracking-[0.4em]"
            autoFocus
            required
          />
        </Field>
        <Button type="submit" block disabled={loading || code.length < 6}>
          {loading ? "Entrando…" : "Entrar"}
        </Button>
        <Button
          variant="ghost"
          block
          onClick={() => {
            setStep("email");
            setCode("");
            setError(undefined);
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} /> Usar outro e-mail
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={sendEmail} className="flex flex-col gap-5">
      <Field label="Seu e-mail" error={error}>
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
      <Button type="submit" block disabled={loading || !email}>
        {loading ? "Enviando…" : "Receber link de acesso"}
      </Button>
      <p className="text-center text-sm text-text-3">Sem senha. Você recebe um link e um código no e-mail.</p>
    </form>
  );
}
