# Perfis e permissões

Dois perfis (`papel` em `profiles`). Cada pessoa tem login próprio — "duas contas" significa dois tipos de acesso, não logins compartilhados (assim dá para saber quem fez o quê).

| Pessoa | E-mail | Papel |
|---|---|---|
| Isack | isackaraujoc@gmail.com | `gestao` |
| Pedro | plzorel@gmail.com | `gestao` |
| Alexandre | alexandredecarli123@gmail.com | `gestao` |
| Luiz | lzzoffh4x@gmail.com | `sdr` |

Cadastro fechado pela tabela `convites`: só e-mails cadastrados nela conseguem criar conta. No primeiro login (link mágico ou código de 6 dígitos), um trigger em `auth.users` cria o perfil com o nome e o papel do convite; qualquer outro e-mail tem a criação abortada. Para incluir alguém: inserir uma linha em `convites`.

## Matriz de acesso

| Recurso | gestao | sdr |
|---|---|---|
| Leads atribuídos a ele | ler/editar | ler/editar |
| Leads de outros / sem responsável | ler/editar | — |
| Mover etapa Prospect → Contato → Respondeu → Com o Isack | ✓ | ✓ (só nos leads dele) |
| Mover para Reunião marcada / Contrato fechado | ✓ | — |
| Marcar perdido (com objeção) | ✓ | ✓ (só até "Respondeu") |
| Reabrir lead perdido | ✓ | — |
| Tarefas | todas | só as atribuídas a ele |
| Biblioteca de objeções | ler/editar | ler + registrar ocorrência |
| Scripts de abordagem | ler/editar | ler |
| Pedir sugestão (IA) | ✓ | ✓ |
| Importar prospects / atribuir | ✓ | — |
| Painel geral, relatórios | ✓ | — (vê só "Eu") |
| Clientes, MRR, propostas | ✓ | — |
| Marketing, Produto, Gestão | ✓ | — |
| Configurações (metas, cadências) | ✓ | — |

## Navegação por perfil

- **sdr** cai em `/hoje`. Barra inferior: Hoje · Leads · Objeções · Eu.
- **gestao** cai em `/painel`. Sidebar no desktop (Painel, Vendas, Marketing, Produto, Clientes, Gestão); barra inferior no celular com os 4 mais usados + "Mais". A Gestão também pode abrir a visão do SDR (`/hoje?como=luiz`) para acompanhar.

## Onde isso é garantido

- **Banco (fonte da verdade):** políticas RLS e RPCs com checagem de papel — ver `docs/arquitetura/seguranca-rls.md`.
- **App:** middleware redireciona por papel; itens de menu escondidos. A UI nunca é a única barreira.
