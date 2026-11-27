import { GestaoNav } from "@/components/nav/GestaoNav";
import { requireRole } from "@/lib/auth";

/** Área da gestão (Isack, Pedro, Alexandre). O SDR é redirecionado para /hoje. */
export default async function GestaoLayout({ children }: LayoutProps<"/">) {
  const user = await requireRole("gestao");
  return (
    <>
      <GestaoNav nome={user.nome} />
      <div className="md:pl-64">{children}</div>
    </>
  );
}
