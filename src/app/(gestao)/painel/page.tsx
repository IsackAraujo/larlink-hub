import { DocList } from "@/components/editorial/DocList";
import { FunnelBars } from "@/components/editorial/FunnelBars";
import { GoalCard } from "@/components/editorial/GoalCard";
import { NewBlock } from "@/components/editorial/NewBlock";
import { RetroButton } from "@/components/editorial/RetroButton";
import { RetroButtonGroup } from "@/components/editorial/RetroButtonGroup";
import { SectionNote } from "@/components/editorial/SectionNote";
import { SectionTitle } from "@/components/editorial/SectionTitle";
import { StatLine } from "@/components/editorial/StatLine";
import { TaskCard } from "@/components/editorial/TaskCard";
import { getPainelData } from "@/lib/painel/sample-data";

export const metadata = { title: "Painel · Larlink Hub" };

// Recalcula a contagem de dias da meta a cada hora.
export const revalidate = 3600;

export default function PainelPage() {
  const data = getPainelData();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
      <section>
        <SectionTitle>Negócio</SectionTitle>
        <GoalCard label="Meta: 5 clientes até 31/12" current={data.goal.current} target={data.goal.target} deadline={data.goal.deadline} />
        <div className="mt-4 space-y-1">
          <StatLine label="MRR" value={data.business.mrr} />
          <StatLine label="Clientes ativos" value={data.business.activeClients} />
          <StatLine label="Leads no funil" value={data.business.leadsInFunnel} />
          <StatLine label="Calls esta semana" value={data.business.callsThisWeek} />
        </div>
        <SectionNote>Atualizado há 2 min</SectionNote>

        <SectionTitle className="mt-6">Luiz · SDR</SectionTitle>
        <div className="space-y-1">
          <StatLine label="Abordagens hoje" value={`${data.sdr.approachesToday} / ${data.sdr.dailyTarget}`} />
          <StatLine label="Respostas na semana" value={data.sdr.repliesThisWeek} />
          <StatLine label="Passados ao Isack" value={data.sdr.handedOff} />
        </div>
        <p className="my-3 text-base">{data.sdr.alert}</p>
        <RetroButton>Ver CRM do Luiz</RetroButton>
      </section>

      <section>
        <SectionTitle>Tarefas</SectionTitle>
        <div className="space-y-3">
          {data.tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
        <p className="my-3 font-mono text-xs">+ {data.backlogCount} tarefas no backlog</p>
        <RetroButton>+ Nova tarefa</RetroButton>
      </section>

      <section>
        <SectionTitle>Funil de vendas</SectionTitle>
        <FunnelBars stages={data.funnel} />

        <SectionTitle className="mt-6">Marketing</SectionTitle>
        <p className="font-mono text-xs">{data.marketing.handle}</p>
        <div className="my-2 border border-ink px-3 py-2.5 text-base leading-snug">
          {data.marketing.nextPost}
          <SectionNote>{data.marketing.nextPostWhen}</SectionNote>
        </div>
        <div className="space-y-1">
          <StatLine label="Stories na semana" value={data.marketing.stories} />
          <StatLine label="Meta Ads" value={data.marketing.metaAds} />
        </div>
        <RetroButtonGroup className="mt-3">
          <RetroButton>Post</RetroButton>
          <RetroButton>Stories</RetroButton>
          <RetroButton aria-label="Mais ações de marketing">…</RetroButton>
        </RetroButtonGroup>
      </section>

      <section>
        <SectionTitle>Clientes</SectionTitle>
        <ul>
          {data.clients.map((client) => (
            <li key={client.name} className="border-b border-rule-soft py-2">
              <div className="flex justify-between gap-2">
                <b className="text-[17px]">{client.name}</b>
                <span className="whitespace-nowrap font-mono text-xs">{client.fee}</span>
              </div>
              <p className="text-[15px] text-muted">{client.note}</p>
            </li>
          ))}
        </ul>

        <SectionTitle className="mt-6">Documentos</SectionTitle>
        <DocList docs={data.docs} />
        <p className="mt-2 font-mono text-xs tracking-[.08em]">VER TODOS ({data.docsTotal})</p>
        <NewBlock className="mt-5" />
      </section>
    </div>
  );
}
