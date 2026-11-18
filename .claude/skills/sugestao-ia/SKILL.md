---
name: sugestao-ia
description: Como montar o contexto, o prompt de sistema e a chamada à Claude API do botão "Pedir sugestão" do SDR, com tom de voz Larlink, limites e feedback. Use ao mexer em src/lib/ia, /api/sugestao ou no relatório semanal com IA.
---

# Sugestão de IA

Referência: `docs/arquitetura/ia-sugestoes.md`.

## Intenções
`primeira_abordagem` · `follow_up` · `responder_objecao` · `livre`

## Montagem do contexto (`src/lib/ia/contexto.ts`)
1. Carregar lead com o client do usuário (respeita RLS — se não carregar, 403).
2. Últimas 10 interações, objeções do lead, etapa, dias na etapa.
3. Scripts ativos do canal/etapa e top 10 objeções com "como responder".
4. Montar mensagens: `system` (prompt fixo versionado) + `user` (contexto em blocos XML + pedido).

## Prompt de sistema — pontos obrigatórios
- Quem é a Larlink: plataforma que atende o lead da imobiliária no WhatsApp com IA, entrega o lead qualificado e pronto para o corretor, e dá à imobiliária os dados do atendimento. **Não se apresentar como "chatbot".**
- Público: dono/gestor de imobiliária, ocupado, no celular.
- Tom: direto, humano, sem tom de vendedor, sem emojis em excesso, sem promessas.
- Não inventar números, cases ou clientes. Não falar preço (preço é com o Isack). Objetivo do SDR é gerar conversa e passar para o Isack, não fechar.
- Formato: mensagem pronta para DM/WhatsApp, até ~60 palavras, + 1 variação curta. Para objeções: 1 linha de leitura do que está por trás + a resposta.

## Chamada
- Server-only (`ANTHROPIC_API_KEY`), modelo de `ANTHROPIC_MODEL`.
- Streaming para a UI; `max_tokens` baixo (~500).
- Rate limit por usuário/dia (consultar `sugestoes_ia` do dia).
- Salvar pedido + resposta + modelo em `sugestoes_ia`; registrar `lead_eventos` tipo `sugestao`.

## Avaliação
- 👍/👎 grava `util`. Revisar mensalmente as 👎 para ajustar prompt (mudança de prompt = PR com exemplos antes/depois).
