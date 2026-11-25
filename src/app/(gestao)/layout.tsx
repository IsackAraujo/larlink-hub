import { ChatPanel } from "@/components/editorial/ChatPanel";
import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { TerminalBar } from "@/components/editorial/TerminalBar";
import { getActivityLog } from "@/lib/painel/sample-data";

export default function GestaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="editorial" className="min-h-screen">
      <TerminalBar lines={getActivityLog()} />
      <EditorialHeader userName="Isack" />
      <div className="flex flex-wrap">
        <main className="min-w-0 flex-[999_1_900px] p-5">{children}</main>
        <ChatPanel />
      </div>
      <footer className="border-t border-ink px-5 py-2.5 font-mono text-[11px] text-muted">
        DADOS DE EXEMPLO — AINDA SEM SUPABASE
      </footer>
    </div>
  );
}
