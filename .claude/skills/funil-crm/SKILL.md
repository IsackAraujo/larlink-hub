---
name: funil-crm
description: Regras do funil de vendas do Larlink Hub — etapas, transições permitidas por perfil, objeção obrigatória em perdido, cadências de follow-up automáticas e pontuação. Use antes de mexer em leads, etapas, tarefas, objeções ou relatórios de funil.
---

# Funil CRM

Fonte da verdade: `docs/produto/funil-e-regras.md`. Se o código discordar do doc, o doc vence (ou atualize os dois no mesmo PR).

## Etapas (enum `etapa_lead`)
`prospect` → `contato_feito` → `respondeu` → `com_isack` → `reuniao_marcada` → `contrato_fechado` · e `perdido`.

SDR opera de `prospect` até passar para `com_isack`. Daí em diante é gestão.

## Checklist ao implementar algo que move lead
- [ ] Usa `rpc('mover_etapa', { p_lead, p_para, p_dados })` — nunca update direto
- [ ] Coleta o dado exigido pela transição (canal; resumo; nota de passagem; data/tipo da reunião; plano+valor; objeção/motivo)
- [ ] Trata erro da RPC com mensagem humana (ex.: "Escolha a objeção antes de marcar como perdido")
- [ ] Revalida Hoje/Leads/Painel afetados
- [ ] Não permite pular etapa (exceto `com_isack → contrato_fechado`)

## Espelho no front (`src/lib/funil/etapas.ts`)
```ts
export const ETAPAS = [
  { id: 'prospect',         label: 'Prospect',          dono: 'sdr',    cor: 'text-3' },
  { id: 'contato_feito',    label: 'Entrou em contato', dono: 'sdr',    cor: 'info'   },
  { id: 'respondeu',        label: 'Obteve resposta',   dono: 'sdr',    cor: 'ink'    },
  { id: 'com_isack',        label: 'Com o Isack',       dono: 'gestao', cor: 'sun'    },
  { id: 'reuniao_marcada',  label: 'Reunião marcada',   dono: 'gestao', cor: 'lavanda'},
  { id: 'contrato_fechado', label: 'Contrato fechado',  dono: 'gestao', cor: 'ok'     },
] as const
export const PERDIDO = { id: 'perdido', label: 'Perdido', cor: 'err' } as const
```
O front usa isso só para exibição/UX. A validação real está na RPC.

## Cadências (padrão)
- `contato_feito`: tarefas D+2, D+5, D+9, D+14 (follow-ups) e D+16 (decidir), dias úteis, 9h SP
- `respondeu`: "Retomar conversa" após 3 dias úteis sem interação
- `com_isack`: "Contatar lead quente" para o closer em 1 dia útil + push imediato
- `reuniao_marcada`: lembrete 1h antes + "Registrar resultado" no dia seguinte
- Mudar de etapa cancela tarefas automáticas pendentes da etapa anterior

## Relatórios
Sempre a partir de `lead_eventos` (histórico), nunca do estado atual de `leads` — senão a conversão por período fica errada.
