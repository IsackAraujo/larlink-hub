# Funil e regras de negócio

Fonte única das regras do CRM. Código (`src/lib/funil/`, RPC `mover_etapa`) segue este doc. Mudou aqui → muda lá, no mesmo PR.

## Etapas

| # | Etapa (`etapa`) | Nome na tela | Dono | Significado |
|---|---|---|---|---|
| 1 | `prospect` | Prospect | SDR | Imobiliária na lista, ainda não abordada |
| 2 | `contato_feito` | Entrou em contato | SDR | Primeira abordagem enviada (DM, WhatsApp, ligação, visita) |
| 3 | `respondeu` | Obteve resposta | SDR | O lead respondeu; conversa em andamento |
| 4 | `com_isack` | Com o Isack | Closer | SDR passou o lead quente para o Isack |
| 5 | `reuniao_marcada` | Reunião marcada | Closer | Call/visita/demonstração agendada |
| 6 | `contrato_fechado` | Contrato fechado | Closer | Virou cliente → cria registro em `clientes` |
| — | `perdido` | Perdido | — | Saiu do funil, **sempre com objeção/motivo** |

Funil do SDR: **1 → 2 → 3 → 4**. A partir de 4 é com a Gestão.

## Transições permitidas

```
prospect ──► contato_feito ──► respondeu ──► com_isack ──► reuniao_marcada ──► contrato_fechado
                 │                 │              │                │
                 ▼                 ▼              ├────────────────┼──► contrato_fechado (fecha direto)
              perdido           perdido           ▼                ▼
          (sem resposta)    (objeção obrig.)   perdido          perdido
```

| De → Para | Quem pode | Exige |
|---|---|---|
| prospect → contato_feito | sdr, gestao | canal da abordagem |
| contato_feito → respondeu | sdr, gestao | resumo curto da resposta ("Como foi?") |
| respondeu → com_isack | sdr, gestao | nota de passagem: interesse, melhor horário, contato do decisor |
| com_isack → reuniao_marcada | gestao | data/hora e tipo (call, visita, demo) |
| com_isack → contrato_fechado | gestao | plano e valor |
| reuniao_marcada → contrato_fechado | gestao | plano e valor |
| qualquer (exceto contrato_fechado) → perdido | sdr só até `respondeu`; gestao em todas | **objeção ou motivo obrigatório** + etapa em que perdeu |
| perdido → prospect | gestao | motivo da reabertura (ex.: reciclar em 60 dias) |
| voltar uma etapa | gestao | — (correção) |

Pular etapas não é permitido, exceto `com_isack → contrato_fechado`.

## Perdido: objeção obrigatória

- Lead que **respondeu e não converteu** → Luiz escolhe a objeção na biblioteca (ou cria "Outra" com texto) e descreve em uma frase.
- Lead que **não respondeu** após a cadência inteira → motivo `sem_resposta` (sem precisar de objeção).
- Motivos fixos além das objeções: `sem_resposta`, `fora_do_perfil`, `ja_tem_solucao`, `fechou_concorrente`, `timing`, `outro`.

## Follow-up automático (cadências)

Criadas pelo banco quando o lead entra numa etapa. Configuráveis pela Gestão (`cadencias`). Valores iniciais (5 toques, alinhado ao playbook):

**Entrou em `contato_feito`** (sem resposta ainda):
| Tarefa | Quando | Sugestão |
|---|---|---|
| Follow-up 1 | D+2 | Lembrete leve + dado do mercado |
| Follow-up 2 | D+5 | Conteúdo de valor (post/case) |
| Follow-up 3 | D+9 | Pergunta direta ("faz sentido conversar?") |
| Follow-up 4 | D+14 | Mensagem de despedida ("fecho seu contato por aqui?") |
| Decidir | D+16 | Marcar `perdido / sem_resposta` ou reciclar |

**Entrou em `respondeu`**: tarefa "Retomar conversa" se ficar **3 dias úteis** sem interação registrada.

**Entrou em `com_isack`**: tarefa para o **Isack** "Contatar lead quente" em até **1 dia útil**; notificação imediata para ele.

**Entrou em `reuniao_marcada`**: lembrete 1h antes; tarefa "Registrar resultado" no dia seguinte.

Regras:
- Qualquer mudança de etapa **cancela** as tarefas automáticas pendentes da etapa anterior.
- Registrar interação em `contato_feito` com "ele respondeu" move para `respondeu` (pergunta antes).
- Tarefas vencem às 9h (America/Sao_Paulo) do dia previsto; dias úteis seg–sex.

## Meta diária do SDR

- Padrão: **6 novas abordagens/dia útil** (`prospect → contato_feito`). Configurável.
- Follow-ups não contam para a meta de novas abordagens, mas aparecem na tela Hoje.
- Sequência (streak): dias úteis seguidos batendo a meta.

## "Como foi?" — registro de experiência

Depois de cada contato registrado, abre uma folha rápida:
- Canal (Instagram, WhatsApp, ligação, visita, e-mail)
- Como foi: 😃 boa · 😐 neutra · 😕 difícil
- Resposta em uma frase (opcional por voz/ditado do teclado)
- Teve objeção? → atalho para "Registrar objeção"

Isso alimenta os relatórios de qualidade e o contexto da IA.

## Pontuação (gamificação, v1 simples)

| Ação | Pontos |
|---|---|
| Nova abordagem | 10 |
| Follow-up feito no prazo | 5 |
| Lead respondeu | 20 |
| Passou para o Isack | 50 |
| Lead dele virou reunião | 80 |
| Lead dele virou contrato | 200 |
| Objeção registrada com detalhe | 5 |

Pontos são calculados a partir de `lead_eventos` (não são editáveis manualmente).
