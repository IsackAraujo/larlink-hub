import { BackToHub } from "@/components/nav/BackToHub";
import { SdrNav } from "@/components/nav/SdrNav";
import { requireRole } from "@/lib/auth";

/** Área do SDR (mobile-first). A gestão também entra, para acompanhar como o Luiz vê. */
export default async function SdrLayout({ children }: LayoutProps<"/">) {
  const user = await requireRole("sdr", "gestao");
  return (
    <>
      {user.papel === "gestao" && <BackToHub />}
      {children}
      <SdrNav />
    </>
  );
}
