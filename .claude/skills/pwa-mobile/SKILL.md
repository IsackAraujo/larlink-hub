---
name: pwa-mobile
description: Como fazer o Larlink Hub funcionar como app no celular — manifest, service worker, instalação no iOS/Android, Web Push com VAPID, offline e padrões de toque. Use ao mexer em PWA, notificações ou layout mobile.
---

# PWA mobile

Referência: `docs/arquitetura/pwa-e-notificacoes.md`.

## Checklist PWA
- [ ] `app/manifest.ts` com `display: 'standalone'`, ícones 192/512 + maskable, cores de tema
- [ ] `<meta name="apple-mobile-web-app-capable" content="yes">` e status bar `black-translucent`
- [ ] `apple-touch-icon` 180×180
- [ ] `viewport-fit=cover` + padding com `env(safe-area-inset-*)`
- [ ] Service worker registrado só em produção; página offline própria
- [ ] Lighthouse PWA ≥ 90

## Push
1. Cliente: após o usuário tocar em "Ativar notificações" (nunca pedir permissão ao abrir), `registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC })` → `POST /api/push` salva em `push_subscriptions`.
2. iOS: só oferecer o botão quando `window.matchMedia('(display-mode: standalone)').matches`; caso contrário, mostrar o guia de instalação.
3. Envio: inserir em `notificacoes_fila`; a Edge Function `notificar` (cron 5 min) envia com `web-push` e remove subscriptions 404/410.
4. SW: `push` → `showNotification(title, { body, icon, badge, data: { url } })`; `notificationclick` → `clients.openWindow(url)` ou foca aba existente.

## Offline
- Shell e fontes em cache (stale-while-revalidate); dados sempre da rede com fallback de cache da última leitura de "Hoje".
- Registros ("Como foi?", "Registrei o contato") vão para IndexedDB se offline e são reenviados ao reconectar; UI mostra "salvo no celular".

## Toque
- Alvos ≥ 44×44; ação principal no rodapé ou bottom sheet.
- `touch-action: manipulation` para evitar delay; sem hover como única pista.
- Inputs com `inputmode` certo (tel, url) e `font-size ≥ 16px` (evita zoom no iOS).
- `navigator.vibrate?.(12)` ao bater meta (Android; iOS ignora em silêncio).
