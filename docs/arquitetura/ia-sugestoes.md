# IA — botão "Pedir sugestão"

## O que faz

Na ficha do lead (e na tela Hoje), o Luiz toca **Pedir sugestão** e escolhe uma intenção:

- **Primeira abordagem** — mensagem personalizada para essa imobiliária
- **Follow-up** — próxima mensagem considerando o histórico
- **Responder objeção** — como contornar o que o lead disse
- **Livre** — pergunta aberta ("ele disse que já usa outro sistema, e agora?")

Resposta curta, pronta para copiar, com 1–2 variações e botões **Copiar**, **Abrir Instagram/WhatsApp**, 👍/👎.

## Arquitetura

`POST /api/sugestao` (Route Handler, runtime Node) → valida sessão e acesso ao lead → monta contexto → chama Claude API (streaming) → salva em `sugestoes_ia`.

### Contexto enviado
1. **Sistema**: quem é a Larlink, tom de voz (direto, sem tom de vendedor, não se apresentar como "chatbot", falar de dados refinados e atendimento que entrega o lead pronto para o corretor), regras (não inventar números ou cases, não prometer preço — preço é com o Isack, mensagens curtas para DM).
2. **Playbook**: scripts ativos do canal/etapa + biblioteca de objeções com "como responder".
3. **Lead**: imobiliária, cidade, seguidores, decisor, etapa, últimas 10 interações, objeções registradas.
4. **Pedido**: intenção + texto livre do Luiz.

O prompt de sistema fica versionado em `src/lib/ia/prompts.ts` — mudanças passam por PR.

## Controles

- Rate limit por usuário/dia; tamanho máximo de saída.
- Modelo via `ANTHROPIC_MODEL` (env) para trocar sem deploy de código.
- Feedback 👍/👎 vira métrica no painel (qualidade da IA) e exemplos para melhorar o prompt.
- Nenhum dado de cliente ativo/financeiro entra no contexto do SDR.

## Futuro
- Resumo automático do relatório semanal (mesma infraestrutura).
- Sugerir objeção a partir do texto livre do "Como foi?".
- Priorizar a fila do dia (quem abordar primeiro) com base no histórico de respostas.
