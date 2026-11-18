import { getCurrentUser, homeFor } from "@/lib/auth";
import { redirect } from "next/navigation";

/** Raiz: cada papel cai na sua tela inicial (sdr → /hoje, gestao → /painel). */
export default async function Home() {
  const user = await getCurrentUser();
  redirect(homeFor(user.papel));
}
