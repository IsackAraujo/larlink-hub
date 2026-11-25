import { redirect } from "next/navigation";

// Enquanto não há auth (A-03), a raiz leva ao painel da gestão.
export default function Home() {
  redirect("/painel");
}
