import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ShoppingBasket, ChefHat, Sparkles } from "lucide-react";
import { Logo } from "@/components/AppShell";
import { RECIPES } from "@/data/recipes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Planted & Simple Meal Prep Assistant — plan your plant-based week" },
      { name: "description", content: "Turn the 30 High-Protein Plant-Based Meals cookbook into a weekly plan, grocery list and prep-day checklist." },
      { property: "og:title", content: "Planted & Simple Meal Prep Assistant" },
      { property: "og:description", content: "Your cookbook, turned into a weekly meal-prep system: plan, shop, prep, eat well." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const picks = [RECIPES[6], RECIPES[12], RECIPES[3], RECIPES[23]];
  const features = [
    { icon: CalendarDays, t: "Plan the week", d: "Start from one of the cookbook's four weekly plans or build your own, then swap any meal." },
    { icon: ShoppingBasket, t: "Shop once", d: "Your grocery list builds itself, grouped by aisle — skipping what's already in your pantry." },
    { icon: ChefHat, t: "Prep in one session", d: "A step-by-step prep-day order: press, cook, chop, portion, freeze." },
    { icon: Sparkles, t: "Smart suggestions", d: "Let AI pick a week from the cookbook around your tastes and what you have." },
  ];
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <Link to="/auth" className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary">Sign in</Link>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pt-12">
        <div>
          <p className="eyebrow">The companion app to your cookbook</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-primary md:text-6xl">
            30 high-protein recipes. <span className="text-gold">One easy week.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            The cookbook gives you the recipes. This gives you the system — plan your meals, build your list, and prep once for the whole week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signup" }} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm">Start planning</Link>
            <Link to="/auth" className="rounded-full px-6 py-3 font-semibold text-primary">I have an account</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {picks.map((r, i) => (
            <div key={r.id} className={`overflow-hidden rounded-2xl shadow-md ${i % 2 ? "mt-8" : ""}`}>
              <img src={r.image} alt={r.title} className="aspect-[4/5] w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Plan · Shop · Prep · Eat well</p>
          <h2 className="mt-2 text-3xl font-extrabold">Everything in the book, working for your week</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.t} className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/15">
                <f.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-3 text-lg font-bold">{f.t}</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        100% plant-based · Made for owners of <em>30 High-Protein Plant-Based Meals</em> by PlantedAndSimple
      </footer>
    </div>
  );
}
