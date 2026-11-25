import { NavLinks } from "./NavLinks";
import { RetroButton } from "./RetroButton";

export function EditorialHeader({ userName }: { userName: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-5 py-3.5">
      <div className="flex flex-wrap items-baseline gap-5">
        <span className="text-[28px] font-semibold tracking-tight">Larlink Hub</span>
        <NavLinks />
      </div>
      <div className="flex gap-2.5">
        <RetroButton aria-label="Notificações">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10 21h4" />
          </svg>
        </RetroButton>
        <RetroButton>Editar</RetroButton>
        <RetroButton>{userName} ▾</RetroButton>
      </div>
    </header>
  );
}
