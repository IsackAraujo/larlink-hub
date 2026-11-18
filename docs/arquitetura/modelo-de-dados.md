# Modelo de dados

SQL inicial em `supabase/migrations/0001_schema_inicial.sql`. Este doc explica o porquê.

## Diagrama (núcleo do CRM)

```
profiles ─┬─< leads >── objecoes (via lead_objecoes)
          │     │
          │     ├─< lead_eventos      (histórico imutável: etapa, nota, pontos)
          │     ├─< interacoes        ("Como foi?")
          │     ├─< tarefas           (auto e manuais)
          │     ├─< sugestoes_ia
          │     └── clientes          (1:1 quando fecha)
          ├─< metas
          └─< push_subscriptions

cadencias   scripts   objecoes   notificacoes_fila   relatorios
conteudos (marketing)   feedbacks (produto)   decisoes (gestão)
```

## Tabelas

### `convites`
Lista de quem pode entrar: `email` (minúsculo), `nome`, `papel`. Só gestão lê/edita.

### `profiles`
Espelho de `auth.users`, criado automaticamente pelo trigger `criar_perfil_convidado` a partir de `convites`. `papel` (`gestao` | `sdr`), `nome`, `avatar_url`, `ativo`.

### `leads`
Uma imobiliária no funil.
- Identificação: `imobiliaria`, `cidade`, `uf`, `site`, `instagram`, `seguidores`, `whatsapp`, `telefone`, `email`
- Decisor: `contato_nome`, `contato_cargo`
- Funil: `etapa` (enum), `etapa_desde`, `responsavel_id` (SDR), `closer_id`
- Qualificação: `origem` (enum), `premium` (bool — lista premium/enterprise), `tamanho_estimado` (nº corretores), `observacoes`, `tags text[]`
- Perda: `perdido_motivo` (enum), `perdido_em_etapa`, `perdido_detalhe`
- Fechamento: `plano`, `valor_mensal`
- Datas: `criado_em`, `atualizado_em`

### `lead_eventos`
Log imutável (insert-only). `tipo`: `etapa`, `nota`, `interacao`, `objecao`, `tarefa_concluida`, `sugestao`. `de_etapa`, `para_etapa`, `pontos`, `autor_id`, `payload jsonb`. Fonte de todos os relatórios e da gamificação.

### `interacoes`
`lead_id`, `canal`, `sentimento` (`boa` | `neutra` | `dificil`), `resumo`, `lead_respondeu bool`, `autor_id`.

### `objecoes` / `lead_objecoes`
Biblioteca (`titulo`, `categoria`: preço | timing | confiança | produto | concorrente | outro, `como_responder`, `ativa`) e ocorrência por lead (`detalhe`, `etapa`, `autor_id`). Objeções de categoria `produto` aparecem no módulo Produto.

### `tarefas`
`lead_id?`, `atribuida_a`, `tipo` (`follow_up` | `retomar` | `contatar_quente` | `reuniao` | `registrar_resultado` | `decidir` | `manual`), `titulo`, `sugestao`, `vence_em`, `concluida_em`, `cancelada_em`, `origem` (`auto` | `manual`), `cadencia_passo`.

### `cadencias`
Config editável: `etapa_gatilho`, `passo`, `dias_uteis`, `tipo_tarefa`, `titulo`, `sugestao`, `para` (`responsavel` | `closer`).

### `scripts`
Modelos de abordagem: `canal`, `etapa`, `titulo`, `texto` (com variáveis `{{imobiliaria}}`, `{{contato}}`, `{{cidade}}`).

### `sugestoes_ia`
`lead_id`, `pedido`, `resposta`, `util` (feedback 👍/👎), `autor_id`, `modelo`.

### `clientes`
Criado por trigger ao entrar em `contrato_fechado`. `lead_id`, `nome`, `plano`, `valor_mensal`, `inicio`, `status` (`implantando` | `ativo` | `pausado` | `cancelado`), `saude` (`verde` | `amarelo` | `vermelho`), `saude_motivo`, `checklist jsonb`, `responsavel_cs`.

### `metas`
`usuario_id?` (null = time), `tipo` (`abordagens_dia`, `clientes_mes`, `mrr`, `visitas_semana`…), `valor`, `inicio`, `fim`.

### Outros
- `push_subscriptions` — endpoint + chaves por dispositivo.
- `notificacoes_fila` — `usuario_id`, `titulo`, `corpo`, `url`, `enviar_em`, `enviada_em`.
- `relatorios` — `periodo`, `numeros jsonb`, `resumo text`.
- `conteudos` (Marketing), `feedbacks` (Produto), `decisoes` (Gestão) — detalhados quando os módulos forem construídos.

## Views de relatório (somente gestao)

- `v_funil_atual` — contagem por etapa.
- `v_conversao_etapas` — taxa etapa→etapa por período (a partir de `lead_eventos`).
- `v_sdr_diario` — abordagens, follow-ups, respostas, passagens por dia.
- `v_objecoes_ranking` — objeções mais frequentes por período e etapa.
- `v_tempo_por_etapa` — tempo médio em cada etapa.
- `v_mrr` — MRR atual e evolução.
- `v_pontos_usuario` — pontos, sequência, conquistas (o SDR lê só a própria linha via função `meus_numeros()`).
