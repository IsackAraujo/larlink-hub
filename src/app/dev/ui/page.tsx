import { requireRole } from "@/lib/auth";
import type { Metadata } from "next";
import { Showcase } from "./Showcase";

export const metadata: Metadata = { title: "Design system" };

/** Vitrine dos tokens e componentes (F-04/F-05). Só para a gestão. */
export default async function DevUiPage() {
  await requireRole("gestao");
  return <Showcase />;
}
