import { redirect } from "next/navigation";

// Provisório: até a autenticação (A-03), a raiz leva para a vitrine do design system.
// Depois: sdr → /hoje, gestao → /painel.
export default function Home() {
  redirect("/dev/ui");
}
