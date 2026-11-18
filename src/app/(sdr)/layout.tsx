import { SdrNav } from "@/components/nav/SdrNav";
import { requireRole } from "@/lib/auth";

/** Área do SDR (mobile-first). A gestão também entra, para acompanhar como o Luiz vê. */
export default async function SdrLayout({ children }: LayoutProps<"/">) {
  await requireRole("sdr", "gestao");
  return (
    <>
      {children}
      <SdrNav />
    </>
  );
}
