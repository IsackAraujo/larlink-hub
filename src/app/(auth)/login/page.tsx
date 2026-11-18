import { GlassCard } from "@/components/ui/GlassCard";
import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Entrar" };

const errors: Record<string, string> = {
  "sem-acesso": "Seu acesso não está ativo. Fale com o Isack.",
  "link-invalido": "Esse link expirou ou já foi usado. Peça um novo.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { erro } = await searchParams;
  const initialError = typeof erro === "string" ? errors[erro] : undefined;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-8 px-5 py-[max(env(safe-area-inset-top),24px)]">
      <header className="enter flex flex-col gap-2 text-center">
        {/* TODO: trocar pelo logo oficial quando o arquivo estiver em public/brand/ */}
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-text-3">Larlink</p>
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-text">Bem-vindo ao Hub</h1>
        <p className="text-[15px] text-text-2">Vendas, clientes e números da Larlink num lugar só.</p>
      </header>
      <GlassCard sheen className="enter p-6">
        <div className="relative z-[2]">
          <LoginForm initialError={initialError} />
        </div>
      </GlassCard>
    </main>
  );
}
