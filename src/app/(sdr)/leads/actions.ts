"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type MoveStageInput = {
  leadId: string;
  to: "contato_feito" | "respondeu" | "com_isack";
  data: Record<string, string>;
};

/** Move o lead pela RPC `mover_etapa` (a única porta de mudança de etapa). */
export async function moveStage({ leadId, to, data }: MoveStageInput): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("mover_etapa", { p_lead: leadId, p_para: to, p_dados: data });
  if (error) return { error: error.message || "Não deu para mover agora. Tente de novo." };
  revalidatePath("/leads");
  revalidatePath("/hoje");
  revalidatePath("/painel");
  return {};
}
