export function ChatPanel() {
  return (
    <aside className="flex min-h-[600px] max-w-full flex-[1_1_320px] flex-col gap-3.5 border-l border-ink p-5" aria-label="Pergunte ao Hub">
      <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[.1em] text-muted">
        <span className="flex-1 border-t border-muted" />
        HOJE
        <span className="flex-1 border-t border-muted" />
      </div>
      <p className="self-end border border-ink bg-paper-2 px-3 py-2 text-base font-semibold">Como foi a semana do Luiz?</p>
      <p className="border border-ink px-3 py-2.5 text-base leading-snug">
        22 abordagens, 7 respostas, 2 passadas pra você. A taxa de resposta subiu com a lista premium. Dois leads estão
        parados com você há mais de 3 dias.
      </p>
      <div className="flex-1" />
      <form className="flex flex-col gap-2">
        <label htmlFor="ask-hub" className="font-mono text-[11px] tracking-[.08em]">
          PERGUNTE AO HUB
        </label>
        <div className="flex gap-2">
          <input
            id="ask-hub"
            placeholder="Ex.: quais leads esfriaram?"
            className="min-w-0 flex-1 rounded-ed border border-ink px-2 py-2 font-serif text-base"
          />
          <button
            type="submit"
            disabled
            title="Em breve (ligado à Claude API)"
            className="rounded-ed border border-ink bg-paper-2 px-2.5 font-mono text-xs font-semibold uppercase tracking-[.08em] shadow-hard disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </form>
    </aside>
  );
}
