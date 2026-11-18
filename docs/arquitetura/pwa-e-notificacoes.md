# PWA e notificações

O Luiz usa a plataforma como "app" no celular: atalho na tela de início, abre em tela cheia, recebe notificações.

## Requisitos

- `app/manifest.ts`: `name: "Larlink Hub"`, `short_name: "Larlink"`, `display: "standalone"`, `start_url: "/hoje"` (o middleware redireciona gestão para `/painel`), `theme_color` = tinta profunda, `background_color` = névoa, ícones 192/512 + maskable + `apple-touch-icon` 180.
- Service worker (Serwist ou SW próprio enxuto):
  - cache do shell e fontes (stale-while-revalidate)
  - página offline bonita ("Sem conexão — o que você registrar será enviado quando voltar")
  - fila offline para "Registrar contato" e "Como foi?" (Background Sync onde houver; senão reenvio ao abrir)
  - handler `push` e `notificationclick` (abre a URL da notificação)
- Splash/status bar: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`, safe areas (`env(safe-area-inset-*)`).

## Instalação

- **Android/Chrome**: banner próprio na primeira visita ("Instalar Larlink no seu celular") usando `beforeinstallprompt`.
- **iPhone/Safari**: não há prompt automático → tela guiada com 3 passos ilustrados (Compartilhar → Adicionar à Tela de Início → Abrir pelo ícone). **Push no iOS só funciona com o app instalado na tela de início (iOS 16.4+)** — por isso a ativação das notificações fica dentro do app instalado.

## Notificações

| Gatilho | Para | Quando | Texto |
|---|---|---|---|
| Resumo do dia | SDR | 08:30 seg–sex | "Bom dia, Luiz ☀️ Hoje: 6 abordagens + 3 follow-ups" |
| Lembrete de meta | SDR | 16:30 se meta < 100% | "Faltam 2 abordagens pra manter sua sequência" |
| Follow-up vencendo | responsável | 09:00 do dia | "Follow-up com Imobiliária X hoje" |
| Lead quente | Isack (closer) | imediato | "🔥 Luiz passou a Imobiliária X pra você" |
| Reunião | closer | 1h antes | "Reunião com X às 15h" |
| Relatório semanal | gestao | seg 07:30 | "Relatório da semana pronto" |

Implementação: eventos inserem em `notificacoes_fila`; `pg_cron` a cada 5 min chama a Edge Function `notificar`, que envia via `web-push` (VAPID) e marca `enviada_em`. Subscriptions inválidas (410) são removidas.

Preferências por usuário: silenciar fora do horário (padrão 08:00–20:00) e por tipo.

## Padrões de toque (mobile)

- Ações principais na metade inferior da tela; barra inferior fixa com 4 itens.
- Bottom sheets para formulários curtos (Como foi?, Objeção, Passar para o Isack).
- Swipe no card do lead: → registrar contato, ← adiar follow-up.
- Pull-to-refresh na tela Hoje.
- Feedback háptico (`navigator.vibrate`, onde houver) ao bater meta.
