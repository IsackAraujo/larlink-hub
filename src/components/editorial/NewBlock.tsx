export function NewBlock({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`w-full cursor-pointer border border-dashed border-ink bg-transparent p-5 text-center font-mono text-ink ${className}`}
    >
      <span className="block text-xl">+</span>
      <span className="text-[11px] tracking-[.1em]">NOVO BLOCO</span>
    </button>
  );
}
