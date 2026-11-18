"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Bottom sheet no celular, modal centralizado no desktop.
 * Fecha com Esc, toque fora ou arrastando a alça para baixo.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(0);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <button
        aria-label="Fechar"
        className="absolute inset-0 bg-ink-deep/20 backdrop-blur-[2px] animate-[enter_240ms_var(--ease-out)_both]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "glass-solid relative z-10 flex max-h-[88dvh] w-full flex-col rounded-t-xl outline-none",
          "pb-[max(env(safe-area-inset-bottom),16px)] md:max-w-lg md:rounded-xl md:pb-0",
          "animate-[enter_240ms_var(--ease-out)_both]",
        )}
        style={{ transform: drag ? `translateY(${drag}px)` : undefined }}
      >
        <div
          className="flex cursor-grab touch-none justify-center pt-2.5 pb-1 md:hidden"
          onPointerDown={(e) => {
            startY.current = e.clientY;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => startY.current !== null && setDrag(Math.max(0, e.clientY - startY.current))}
          onPointerUp={() => {
            if (drag > 90) onClose();
            setDrag(0);
            startY.current = null;
          }}
        >
          <span className="h-1.5 w-10 rounded-pill bg-text-3/50" />
        </div>
        <div className="flex items-center justify-between px-5 pt-2 pb-3 md:pt-5">
          <h2 id={titleId} className="text-lg font-semibold text-text">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="hidden size-9 items-center justify-center rounded-pill text-text-2 hover:bg-glass md:flex"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 pb-4">{children}</div>
        {footer && <div className="border-t border-line px-5 pt-3 md:pb-5">{footer}</div>}
      </div>
    </div>
  );
}
