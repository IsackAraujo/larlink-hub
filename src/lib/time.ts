/** Utilitários de data no fuso America/Sao_Paulo (UTC−3, sem horário de verão). */
const TZ = "America/Sao_Paulo";

function todaySP(): string {
  // YYYY-MM-DD no fuso de São Paulo
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function startOfTodaySP(): string {
  return new Date(`${todaySP()}T00:00:00-03:00`).toISOString();
}

export function endOfTodaySP(): string {
  return new Date(`${todaySP()}T23:59:59.999-03:00`).toISOString();
}

export function greetingSP(): string {
  const h = Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", hour12: false }).format(new Date()));
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}
