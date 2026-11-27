import { Bot, Briefcase, HeartHandshake, LayoutDashboard, Megaphone, Package, Workflow, type LucideIcon } from "lucide-react";

export type Modulo = { href: string; label: string; descricao: string; icon: LucideIcon; beta?: boolean };

/** Os 5 pilares da Larlink + painel e agentes. Fonte única para menu, “Mais” e painel. */
export const MODULOS: Modulo[] = [
  { href: "/painel", label: "Painel", descricao: "Números da empresa num lugar só", icon: LayoutDashboard },
  { href: "/comercial", label: "Comercial", descricao: "Funil, o Luiz e seus leads quentes", icon: Briefcase },
  { href: "/clientes", label: "Clientes", descricao: "Saúde e próximos passos de cada cliente", icon: HeartHandshake, beta: true },
  { href: "/marketing", label: "Marketing", descricao: "Laboratório de criativos e conteúdo", icon: Megaphone, beta: true },
  { href: "/produto", label: "Produto", descricao: "Roadmap e qualidade do bot", icon: Package, beta: true },
  { href: "/gestao", label: "Gestão", descricao: "Rituais e processos da empresa", icon: Workflow, beta: true },
  { href: "/agentes", label: "Agentes", descricao: "O que a IA pode fazer pela operação", icon: Bot, beta: true },
];
