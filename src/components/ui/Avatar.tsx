export function Avatar({ name, src, size = 36 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-ink text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </span>
  );
}
