/**
 * Fundo "dia nublado com sol": névoa (no body) + um sol difuso que deriva devagar
 * + nuvens brancas borradas. Fixo, sem eventos de ponteiro; parado com reduced-motion.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[30vw] -right-[25vw] h-[80vw] w-[80vw] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--sun) 14%, transparent) 0%, color-mix(in srgb, var(--sun) 6%, transparent) 35%, transparent 65%)",
          animation: "sun-drift 36s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[10vh] -left-[20vw] h-[60vw] w-[70vw] rounded-full blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(closest-side, color-mix(in srgb, var(--ceramic) 90%, transparent), transparent)",
          animation: "cloud-drift 52s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-20vh] right-[5vw] h-[50vw] w-[60vw] rounded-full blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(closest-side, color-mix(in srgb, var(--ceramic) 75%, transparent), transparent)",
          animation: "cloud-drift 64s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}
