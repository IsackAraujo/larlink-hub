"use client";

import { Avatar } from "@/components/ui/Avatar";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { FunnelBar } from "@/components/ui/FunnelBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Page } from "@/components/ui/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Section } from "@/components/ui/Section";
import { Segmented } from "@/components/ui/Segmented";
import { Select } from "@/components/ui/Select";
import { Sheet } from "@/components/ui/Sheet";
import { Skeleton } from "@/components/ui/Skeleton";
import { StageBadge } from "@/components/ui/StageBadge";
import { Stat } from "@/components/ui/Stat";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { ETAPAS, PERDIDO } from "@/lib/funil/etapas";
import { Flame, House, Lightbulb, MessageCircleQuestion, Sun, User, Users } from "lucide-react";
import { useState } from "react";

const swatches = [
  ["ink", "Azul-tinta"],
  ["ink-deep", "Tinta noite"],
  ["sun", "Ouro (sol)"],
  ["mist-1", "Névoa"],
  ["ceramic", "Cerâmica"],
  ["ok", "Sucesso"],
  ["warn", "Atenção"],
  ["err", "Erro"],
  ["info", "Info"],
] as const;

type Aba = "prospect" | "contato" | "respondeu";

export function Showcase() {
  const toast = useToast();
  const [feitas, setFeitas] = useState(4);
  const [sheet, setSheet] = useState(false);
  const [canal, setCanal] = useState("Instagram");
  const [humor, setHumor] = useState<string | null>("boa");
  const [aba, setAba] = useState<Aba>("contato");

  return (
    <Page>
      <PageHeader
        title="Hoje"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            Bom dia, Luiz <Sun size={14} strokeWidth={1.75} className="text-sun" />
          </span>
        }
        aside={
          <span className="glass inline-flex h-9 items-center gap-1.5 rounded-pill px-3 text-sm text-text">
            <Flame size={16} strokeWidth={1.75} className="text-sun" />
            <span className="font-mono tabular-nums">5</span> dias
          </span>
        }
      />

      {/* ── Prévia da tela Hoje ── */}
      <GlassCard sheen>
        <ProgressRing
          value={feitas}
          max={6}
          label="Novas abordagens"
          hint={feitas >= 6 ? "O que vier agora é bônus" : `Faltam ${6 - feitas} · 320 pts hoje`}
        />
      </GlassCard>

      <Section title="Follow-ups" count={1} action={<Button variant="ghost" size="sm">ver todos</Button>}>
        <GlassCard interactive className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-text">Imobiliária Alfa</p>
              <p className="text-sm text-text-2">Itajaí · Follow-up 2 · hoje</p>
            </div>
            <StageBadge etapa="contato_feito" />
          </div>
          <p className="rounded-md bg-sun-soft px-3 py-2 text-sm text-ink-deep">
            Mande um conteúdo de valor (post ou case)
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setSheet(true)}>
              Feito
            </Button>
            <Button size="sm" variant="glass">
              Adiar
            </Button>
            <Button size="sm" variant="ghost" aria-label="Pedir sugestão">
              <Lightbulb size={16} strokeWidth={1.75} /> Sugestão
            </Button>
          </div>
        </GlassCard>
      </Section>

      <Section title="Próximos para abordar">
        <GlassCard className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name="Beta Imóveis" />
            <div>
              <p className="font-semibold text-text">Beta Imóveis</p>
              <p className="text-sm text-text-2">
                Balneário Camboriú · <span className="font-mono tabular-nums">2.4k</span> seguidores
              </p>
            </div>
          </div>
          <Button
            variant="sun"
            size="sm"
            onClick={() => {
              setFeitas((n) => Math.min(n + 1, 6));
              toast("Abordagem registrada");
            }}
          >
            Abordar
          </Button>
        </GlassCard>
      </Section>

      {/* ── Biblioteca ── */}
      <hr className="my-6 border-line" />
      <h2 className="text-xl font-semibold tracking-[-0.01em] text-text">Design system</h2>

      <Section title="Cores">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-9">
          {swatches.map(([token, nome]) => (
            <div key={token} className="flex flex-col gap-1.5">
              <div
                className="h-14 rounded-md border border-line"
                style={{ background: `var(--${token})` }}
              />
              <span className="text-xs text-text-2">{nome}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <GlassCard className="flex flex-col gap-2">
          <p className="text-[34px] font-semibold tracking-[-0.02em]">Inter · títulos</p>
          <p className="text-[15px] text-text-2">Corpo em Inter, direto e calmo, sem tom de vendedor.</p>
          <p className="font-mono text-2xl tabular-nums">R$ 750 · 6/6 · 82%</p>
        </GlassCard>
      </Section>

      <Section title="Botões">
        <div className="flex flex-wrap gap-2">
          <Button>Primário</Button>
          <Button variant="sun">CTA principal</Button>
          <Button variant="glass">Vidro</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Desabilitado</Button>
        </div>
      </Section>

      <Section title="Etapas do funil">
        <div className="flex flex-wrap gap-2">
          {[...ETAPAS, PERDIDO].map((e) => (
            <StageBadge key={e.id} etapa={e.id} />
          ))}
        </div>
      </Section>

      <Section title="Segmentado + chips">
        <Segmented<Aba>
          label="Etapas do SDR"
          value={aba}
          onChange={setAba}
          options={[
            { value: "prospect", label: "Prospect", count: 42 },
            { value: "contato", label: "Contato", count: 18 },
            { value: "respondeu", label: "Respondeu", count: 5 },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          {["Instagram", "WhatsApp", "Ligação", "Visita"].map((c) => (
            <Chip key={c} selected={canal === c} onClick={() => setCanal(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Indicadores">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Abordagens" value={27} delta={12} />
          <Stat label="Taxa de resposta" value={22} suffix="%" delta={-4} />
          <Stat label="Com o Isack" value={4} />
          <Stat label="MRR" value="R$ 350" />
        </div>
        <GlassCard>
          <FunnelBar
            steps={[
              { label: "Prospect", value: 120 },
              { label: "Entrou em contato", value: 74 },
              { label: "Obteve resposta", value: 16 },
              { label: "Com o Isack", value: 7 },
              { label: "Reunião marcada", value: 3 },
              { label: "Contrato fechado", value: 1 },
            ]}
          />
        </GlassCard>
      </Section>

      <Section title="Formulário">
        <GlassCard className="flex flex-col gap-4">
          <Field label="Imobiliária" hint="Como aparece no Instagram">
            <Input placeholder="Ex.: Beta Imóveis" />
          </Field>
          <Field label="Cidade">
            <Select defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              <option>Itajaí</option>
              <option>Pato Branco</option>
            </Select>
          </Field>
          <Field label="Observação" error="Escreva ao menos uma frase">
            <Textarea placeholder="O que ele disse?" />
          </Field>
        </GlassCard>
      </Section>

      <Section title="Carregando e vazio">
        <GlassCard className="flex flex-col gap-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </GlassCard>
        <GlassCard>
          <EmptyState
            icon={Sun}
            title="Sem follow-ups hoje"
            description="Bora abrir porta nova?"
            action={<Button variant="sun">Abordar</Button>}
          />
        </GlassCard>
      </Section>

      <Sheet
        open={sheet}
        onClose={() => setSheet(false)}
        title="Como foi?"
        footer={
          <Button
            block
            onClick={() => {
              setSheet(false);
              toast("Follow-up registrado");
            }}
          >
            Salvar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {["Instagram", "WhatsApp", "Ligação"].map((c) => (
              <Chip key={c} selected={canal === c} onClick={() => setCanal(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="flex gap-2">
            {[
              ["boa", "😃 Boa"],
              ["neutra", "😐 Neutra"],
              ["dificil", "😕 Difícil"],
            ].map(([v, l]) => (
              <Chip key={v} selected={humor === v} onClick={() => setHumor(v)}>
                {l}
              </Chip>
            ))}
          </div>
          <Field label="O que ele disse?">
            <Input placeholder="Em uma frase" />
          </Field>
        </div>
      </Sheet>

      <BottomNav
        items={[
          { href: "/dev/ui", label: "Hoje", icon: House },
          { href: "/leads", label: "Leads", icon: Users },
          { href: "/objecoes", label: "Objeções", icon: MessageCircleQuestion },
          { href: "/eu", label: "Eu", icon: User },
        ]}
      />
    </Page>
  );
}
