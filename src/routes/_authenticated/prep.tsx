import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, Snowflake } from "lucide-react";
import { PageHeader, Empty } from "@/components/AppShell";
import { buildPrep, sharedComponents } from "@/lib/prep";
import { useCurrentPlan, useProfile, useSavePlan } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/prep")({
  head: () => ({ meta: [{ title: "Prep day — Planted & Simple" }, { name: "description", content: "Your step-by-step prep-day plan." }, { property: "og:title", content: "Prep day — Planted & Simple" }, { property: "og:description", content: "Prep once, eat all week." }] }),
  component: Prep,
});

function Prep() {
  const plan = useCurrentPlan();
  const profile = useProfile();
  const save = useSavePlan();
  const tasks = useMemo(() => (plan.data ? buildPrep(plan.data.slots) : []), [plan.data]);
  const shared = useMemo(() => (plan.data ? sharedComponents(plan.data.slots) : []), [plan.data]);
  const done = new Set(plan.data?.prep_done ?? []);

  if (!plan.isLoading && (!plan.data || tasks.length <= 1)) {
    return (<><PageHeader eyebrow="Prep once" title="Prep day" /><Empty title="Plan a few meals first">Your prep-day checklist is built from this week's recipes. <Link to="/planner" className="font-semibold text-primary underline">Open the planner</Link></Empty></>);
  }

  function toggle(id: string) {
    if (!plan.data) return;
    const next = new Set(done);
    next.has(id) ? next.delete(id) : next.add(id);
    save.mutate({ id: plan.data.id, prep_done: [...next] });
  }

  const pct = tasks.length ? Math.round((tasks.filter((t) => done.has(t.id)).length / tasks.length) * 100) : 0;
  let lastPhase = "";

  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`${profile.data?.prep_day ?? "Sunday"} prep`} title="Prep day plan" />
      <div>
        <div className="mb-1 flex justify-between text-sm"><span className="font-semibold text-primary">{pct}% done</span><span className="text-muted-foreground">{tasks.length} steps</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
      </div>

      {shared.length > 0 && (
        <section className="rounded-2xl border-l-4 border-gold bg-accent p-5">
          <p className="eyebrow">Prep once, use many times</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {shared.map((c) => <li key={c.name}><span className="font-semibold text-primary">{c.name}</span> → {c.recipes.join(", ")}</li>)}
          </ul>
        </section>
      )}

      <ol className="space-y-2">
        {tasks.map((t) => {
          const header = t.phase !== lastPhase ? t.phase : null;
          lastPhase = t.phase;
          const on = done.has(t.id);
          return (
            <li key={t.id}>
              {header && <p className="eyebrow mb-2 mt-5">{header}</p>}
              <button onClick={() => toggle(t.id)} className="flex w-full items-start gap-3 rounded-2xl border bg-card p-4 text-left">
                <span className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${on ? "border-primary bg-primary text-primary-foreground" : "border-primary/40"}`}>{on && <Check className="h-4 w-4" />}</span>
                <span className={on ? "opacity-50" : ""}>
                  <span className="flex items-center gap-2 font-semibold text-primary">{t.title}{t.id === "freeze" && <Snowflake className="h-4 w-4" />}{t.minutes ? <span className="text-xs font-normal text-muted-foreground">~{t.minutes} min</span> : null}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{t.detail}</span>
                  {t.recipes.length > 1 && <span className="mt-1 block text-xs text-muted-foreground">For: {t.recipes.join(", ")}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
