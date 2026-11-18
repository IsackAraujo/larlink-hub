---
name: larlink-design-system
description: Como construir UI no padrão visual da Larlink (vidro fosco, luz de sol em dia nublado, cerâmica clara, Inter + JetBrains Mono). Use sempre antes de criar ou alterar qualquer tela ou componente do Larlink Hub.
---

# Larlink design system

Referência completa: `docs/design/design-system.md` e `docs/design/identidade-visual.md`. Este é o resumo operacional.

## Regras rápidas
1. **Cores só por token**: `--ink`, `--ink-deep`, `--sun`, `--mist-1/2`, `--ceramic`, `--glass*`, `--text*`, estados. Em Tailwind: `bg-ink`, `text-text-2`, `bg-glass` etc. Nunca hex solto.
2. **Superfícies = `GlassCard`**. Não crie `div` com fundo branco e sombra própria.
3. **Ouro (`--sun`) é o sol**: só para o CTA principal, meta/conquista e reflexos. Máx. 1 elemento ouro sólido por tela.
4. **Números em JetBrains Mono** (`font-mono`), com `tabular-nums`.
5. **Raios**: cards `--r-lg` (22px), botões `--r-pill` ou `--r-md`, sheets `--r-xl` no topo.
6. **Sombras longas e claras** (`--shadow-1/2`) + `--highlight` (quina de espelho). Nada de sombra escura curta.
7. **Espaço na escala de 4**; padding de card 16 (mobile) / 24 (desktop).
8. **Movimento**: resposta ao toque 150–250ms com `--ease-spring`; entradas com fade + 8px; ambiente (sheen, sol no fundo) lento, 6s+; tudo com fallback `prefers-reduced-motion`.
9. **Sheen** (`<GlassCard sheen>`) apenas em 1 destaque por tela.

## Esqueleto de tela
```tsx
<Page>                      {/* aplica fundo névoa+sol e safe areas */}
  <PageHeader title="Hoje" subtitle="Bom dia, Luiz ☀️" aside={<Streak days={5} />} />
  <GlassCard sheen>
    <ProgressRing value={4} max={6} label="Novas abordagens" />
  </GlassCard>
  <Section title="Follow-ups" count={3}>
    {items.map(i => <LeadCard key={i.id} {...i} />)}
  </Section>
</Page>
```

## Componentes disponíveis
Button (`primary|sun|ghost|glass`), GlassCard, Sheet, BottomNav, StageBadge, ProgressRing, Stat, FunnelBar, Toast, EmptyState, Input, Textarea, Select, Segmented, Chip, Avatar, Skeleton.
Se precisar de um novo, crie em `src/components/ui/`, documente na tabela de `design-system.md` e adicione em `/dev/ui`.

## Antipadrões (recusar)
- Cinza neutro `#f3f4f6`/`#e5e7eb` estilo Tailwind padrão
- Azul `#3b82f6` ou qualquer cor fora da paleta
- Gradientes saturados, neon, glassmorphism escuro
- Ícones de pacotes misturados (usar um só conjunto: Lucide, traço 1.75)
- Tabelas densas no mobile — no celular vira lista de cards
