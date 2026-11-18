# ADR 0002 — Dois perfis (gestao, sdr) com logins individuais

**Status:** aceita · **Data:** 2026-11-17

## Contexto
O pedido foi "duas contas": uma da gestão (Isack, Pedro, Alexandre) e uma do Luiz.

## Decisão
Implementar como **dois perfis de acesso** com **login individual por pessoa**, não logins compartilhados.

## Consequências
- (+) Histórico mostra quem fez cada coisa (quem moveu, quem fechou).
- (+) Notificações vão para a pessoa certa (lead quente → Isack).
- (+) Fácil adicionar outro SDR no futuro.
- (−) Quatro convites em vez de dois — custo irrelevante.
