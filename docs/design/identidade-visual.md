# Identidade visual

Base: guia de estilo oficial da Larlink (v1.2). Este doc traduz o guia para a plataforma. Ajustes que o Isack ainda vai detalhar entram na seção **Pendências** no fim.

## A sensação

> Um espelho com sol batendo num dia nublado.

- **Luz difusa, não brilho estourado.** O céu é névoa clara; o sol aparece em reflexos suaves que passam pelas superfícies.
- **Vidro fosco sobre névoa.** Cartões translúcidos com desfoque de fundo, borda fina de luz no topo (como a quina de um espelho pegando sol).
- **Cerâmica nova.** Branco quente, limpo, liso. Inspiração Apple: espaço, silêncio, tipografia precisa.
- **Nunca estático, nunca agitado.** Movimento lento e contínuo — um reflexo que atravessa um card em 6–8s, um gradiente de luz que respira. Ações respondem rápido (150–250ms) e com mola suave.

## Paleta

| Papel | Nome | Hex |
|---|---|---|
| Primária | Azul-tinta | `#2B3E5A` |
| Primária profunda | Tinta noite | `#1D2C42` |
| Acento (sol) | Ouro | `#F0A527` |
| Fundo | Névoa | `#EEF1F5` → `#F7F8FA` (gradiente) |
| Superfície | Cerâmica | `#FBFBFA` |
| Vidro | Branco 55–70% + blur 20–28px | `rgba(255,255,255,.62)` |
| Texto principal | Tinta noite | `#1D2C42` |
| Texto secundário | Tinta 60% | `rgba(29,44,66,.6)` |

Ouro é **acento**, não fundo: meta batida, CTA principal, destaque de conquista, o "sol" nos reflexos. Máximo 1 elemento ouro sólido por tela.

Cores de estado (dessaturadas para casar com a névoa): sucesso `#3F8F6B`, atenção `#D98E1F`, erro `#C2514A`, info `#4A6FA5`.

## Tipografia

- **Inter** — toda a interface. Títulos 600, corpo 400/500, tracking levemente negativo em títulos grandes.
- **JetBrains Mono** — números, métricas, datas, IDs, contadores de meta (dá precisão de "painel de instrumentos").

## Logo

Usar sempre o logo oficial (arquivo do guia). Grafia: **Larlink**. Nunca recriar, nunca usar marcador genérico.

## Voz da interface

- Direta, calorosa, sem tom de vendedor.
- Fala com o Luiz na segunda pessoa: "Faltam 2 abordagens", "Boa! Sequência de 5 dias".
- Sem jargão técnico na interface do SDR.
- Erros explicam o que fazer: "Escolha a objeção antes de marcar como perdido".

## Pendências (Isack vai detalhar)

- [ ] Ajustes específicos da identidade para a plataforma (mencionados como "algumas modificações")
- [ ] Ícone do PWA (versão do logo para 512×512 maskable)
- [ ] Tema escuro ("Noite") — sim/não e quando
- [ ] Ilustrações/estados vazios
