"use server";

import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const FREQS = ["diario", "semanal", "quinzenal", "mensal"] as const;

export async function saveRitual(formData: FormData): Promise<{ error?: string }> {
  await requireRole("gestao");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const frequencia = String(formData.get("frequencia") ?? "semanal");
  const quando = String(formData.get("quando") ?? "").trim() || null;
  const duracao = Number(formData.get("duracao_min"));
  const pauta = String(formData.get("pauta") ?? "").trim() || null;
  if (!titulo) return { error: "Dê um nome ao ritual." };
  if (!FREQS.includes(frequencia as (typeof FREQS)[number])) return { error: "Frequência inválida." };

  const supabase = await createClient();
  const { error } = await supabase.from("rituais").insert({
    titulo,
    frequencia,
    quando,
    duracao_min: Number.isFinite(duracao) && duracao >= 5 && duracao <= 480 ? duracao : null,
    pauta,
  });
  if (error) return { error: "Não deu para salvar agora." };
  revalidatePath("/gestao");
  return {};
}

export async function removeRitual(id: string) {
  await requireRole("gestao");
  const supabase = await createClient();
  await supabase.from("rituais").update({ ativo: false }).eq("id", id);
  revalidatePath("/gestao");
}
