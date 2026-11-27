"use server";

import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createClientAccount(formData: FormData): Promise<{ error?: string }> {
  await requireRole("gestao");
  const nome = String(formData.get("nome") ?? "").trim();
  const plano = String(formData.get("plano") ?? "").trim() || null;
  const valor = Number(String(formData.get("valor_mensal") ?? "").replace(",", "."));
  if (!nome) return { error: "Informe o nome do cliente." };
  const supabase = await createClient();
  const { error } = await supabase.from("clientes").insert({
    nome,
    plano,
    valor_mensal: Number.isFinite(valor) && valor > 0 ? valor : null,
    status: "ativo",
    saude: "verde",
  });
  if (error) return { error: "Não deu para salvar agora." };
  revalidatePath("/clientes");
  revalidatePath("/painel");
  return {};
}
