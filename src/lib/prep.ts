import { RECIPE_BY_ID } from "@/data/content";
import type { PlanSlots, Recipe } from "@/data/types";
import { planRecipeCounts } from "./grocery";

export interface PrepTask { id: string; title: string; detail: string; recipes: string[]; minutes?: number; phase: string }

const has = (r: Recipe, words: string[]) =>
  r.ingredients.some((i) => words.some((w) => i.toLowerCase().includes(w)));

/** Deterministic prep-day order: base components first, then longest cooks, then assembly. */
export function buildPrep(slots: PlanSlots): PrepTask[] {
  const recipes = [...planRecipeCounts(slots).keys()].map((id) => RECIPE_BY_ID[id]);
  const tasks: PrepTask[] = [];
  const grains = recipes.filter((r) => has(r, ["rice", "quinoa", "farro"]));
  const tofu = recipes.filter((r) => has(r, ["tofu"]));
  const lentils = recipes.filter((r) => has(r, ["lentil"]));
  const chop = recipes.filter((r) => has(r, ["onion", "pepper", "carrot", "cucumber", "broccoli"]));

  if (tofu.length) tasks.push({ id: "press-tofu", phase: "Start", title: "Press your tofu", detail: "Press every block you'll use this week while you set up — 15–20 minutes.", recipes: tofu.map((r) => r.title), minutes: 20 });
  if (grains.length) tasks.push({ id: "grains", phase: "Start", title: "Cook one big pot of grains", detail: "Cook enough rice or quinoa for every bowl this week. Keep it slightly under-done so it reheats fluffy.", recipes: grains.map((r) => r.title), minutes: 25 });
  if (chop.length) tasks.push({ id: "chop", phase: "Chop", title: "Chop vegetables for the week", detail: "Dice onions, peppers and crunchy veg at once; store in glass containers.", recipes: chop.map((r) => r.title), minutes: 20 });
  if (lentils.length) tasks.push({ id: "lentils", phase: "Cook", title: "Get the lentil dishes going", detail: "Lentil stews and sauces simmer hands-off while you work on the rest.", recipes: lentils.map((r) => r.title) });

  const cookFirst = recipes.filter((r) => r.mealPrep || r.freezer).sort((a, b) => b.totalMinutes - a.totalMinutes);
  for (const r of cookFirst) tasks.push({ id: `cook-${r.id}`, phase: "Cook", title: `Make ${r.title}`, detail: `${r.prep} prep · ${r.cook} cook · serves ${r.serves}. ${r.storage.fridge ?? ""}`, recipes: [r.title], minutes: r.totalMinutes });

  tasks.push({ id: "portion", phase: "Finish", title: "Portion and label", detail: "Portion meals into containers and label with name and date. Dressings go on the bottom of jars, greens on top.", recipes: [] });
  const freeze = recipes.filter((r) => r.freezer);
  if (freeze.length) tasks.push({ id: "freeze", phase: "Finish", title: "Freeze the later-in-week portions", detail: "Cool completely first, then freeze flat.", recipes: freeze.map((r) => r.title) });
  return tasks;
}

/** Components shared across several recipes — "prep once, use many times". */
export function sharedComponents(slots: PlanSlots) {
  const recipes = [...planRecipeCounts(slots).keys()].map((id) => RECIPE_BY_ID[id]);
  const comps: [string, string[]][] = [
    ["Tofu", ["tofu"]], ["Tempeh", ["tempeh"]], ["Chickpeas", ["chickpea"]], ["Lentils", ["lentil"]],
    ["Rice", ["rice"]], ["Quinoa", ["quinoa"]], ["Black beans", ["black bean"]], ["Tahini dressing", ["tahini"]],
  ];
  return comps
    .map(([name, words]) => ({ name, recipes: recipes.filter((r) => has(r, words)).map((r) => r.title) }))
    .filter((c) => c.recipes.length > 1);
}
