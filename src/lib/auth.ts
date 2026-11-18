import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "./supabase/server";

export type Papel = "gestao" | "sdr";
export type CurrentUser = { id: string; email: string; nome: string; papel: Papel };

/** Usuário logado + perfil. Redireciona para /login se não houver sessão ou perfil ativo. */
export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nome, papel, ativo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.ativo) redirect("/login?erro=sem-acesso");

  return { id: user.id, email: user.email ?? "", nome: profile.nome, papel: profile.papel as Papel };
});

/** Exige um dos papéis; caso contrário manda para a home do papel do usuário. */
export async function requireRole(...papeis: Papel[]) {
  const user = await getCurrentUser();
  if (!papeis.includes(user.papel)) redirect(homeFor(user.papel));
  return user;
}

export function homeFor(papel: Papel) {
  return papel === "sdr" ? "/hoje" : "/painel";
}
