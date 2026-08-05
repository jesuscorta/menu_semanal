import type { GeneratedMenu, GenerationInput, MealCandidate, MenuItem, Slot } from "./types";

export const SCORE = { neededCategory: 8, notRecent: 5, favorite: 3, balancedDay: 2, practicalBatch: 2, previousWeek: -4, repeatedFamily: -3, informalPair: -5, dinnerCarbOver: -6, sameFamilyDay: -10, avoid: -20 } as const;

function random(seed: number) { let state = seed >>> 0; return () => { state += 0x6d2b79f5; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function isFish(meal: MealCandidate) { return meal.proteinFamily === "white_fish" || meal.proteinFamily === "oily_fish" || meal.proteinFamily === "seafood_cephalopod"; }
function required(meal: MealCandidate, slot: Slot, selected: MealCandidate[]) {
  if (slot === "lunch") return (meal.functionalType.includes("legume") && !selected.some((m) => m.functionalType.includes("legume"))) || (meal.proteinFamily === "poultry" && !selected.some((m) => m.proteinFamily === "poultry")) || (isFish(meal) && !selected.some(isFish)) || ((meal.proteinFamily === "beef" || meal.proteinFamily === "pork") && !selected.some((m) => m.proteinFamily === "beef" || m.proteinFamily === "pork")) || (meal.functionalType === "flexible_meal" && !selected.some((m) => m.functionalType === "flexible_meal"));
  return (meal.proteinFamily === "white_fish" && !selected.some((m) => m.proteinFamily === "white_fish")) || ((meal.proteinFamily === "oily_fish" || meal.proteinFamily === "seafood_cephalopod") && !selected.some((m) => m.proteinFamily === "oily_fish" || m.proteinFamily === "seafood_cephalopod")) || ((meal.proteinFamily === "poultry" || meal.proteinFamily === "beef" || meal.proteinFamily === "pork") && !selected.some((m) => m.proteinFamily === "poultry" || m.proteinFamily === "beef" || m.proteinFamily === "pork")) || (meal.proteinFamily === "eggs" && !selected.some((m) => m.proteinFamily === "eggs")) || ((meal.functionalType === "controlled_informal" || meal.functionalType === "complete_protein_salad") && !selected.some((m) => m.functionalType === "controlled_informal" || m.functionalType === "complete_protein_salad"));
}
function weight(meal: MealCandidate, slot: Slot, selected: MealCandidate[], recent: Set<string>, other?: MealCandidate) {
  let value = 20;
  if (required(meal, slot, selected)) value += SCORE.neededCategory;
  value += recent.has(meal.id) ? SCORE.previousWeek : SCORE.notRecent;
  if (meal.preference === "favorite") value += SCORE.favorite;
  if (meal.preference === "avoid") value += SCORE.avoid;
  if (selected.filter((item) => item.proteinFamily === meal.proteinFamily).length >= 2) value += SCORE.repeatedFamily;
  if (other && other.proteinFamily !== meal.proteinFamily) value += SCORE.balancedDay;
  return Math.max(0.1, value);
}
function choose(candidates: MealCandidate[], rng: () => number, score: (item: MealCandidate) => number) {
  const total = candidates.reduce((sum, item) => sum + score(item), 0); let point = rng() * total;
  for (const item of candidates) { point -= score(item); if (point <= 0) return item; }
  return candidates[candidates.length - 1]!;
}
function build(input: GenerationInput, rng: () => number, relaxed: boolean): GeneratedMenu | null {
  const recent = new Set(input.recentMealIds); const usable = input.meals.filter((meal) => meal.active && meal.preference !== "rejected" && meal.vegetablesRequired);
  const items: MenuItem[] = []; const lunches: MealCandidate[] = []; const dinners: MealCandidate[] = [];
  for (let day = 0; day < 5; day++) {
    const lunchChoices = usable.filter((meal) => meal.slot === "lunch" && (relaxed || meal.preference !== "avoid") && (relaxed || !lunches.some((item) => item.id === meal.id)) && (relaxed || lunches.at(-1)?.proteinFamily !== meal.proteinFamily));
    if (!lunchChoices.length) return null;
    const lunch = choose(lunchChoices, rng, (meal) => weight(meal, "lunch", lunches, recent)); lunches.push(lunch); items.push({ day, slot: "lunch", meal: lunch });
    const dinnerCarbs = dinners.filter((meal) => meal.hasConcentratedCarb).length;
    const dinnerChoices = usable.filter((meal) => meal.slot === "dinner" && (relaxed || meal.preference !== "avoid") && (relaxed || !dinners.some((item) => item.id === meal.id)) && (relaxed || dinners.at(-1)?.proteinFamily !== meal.proteinFamily) && (relaxed || meal.proteinFamily !== lunch.proteinFamily) && (relaxed || !(isFish(meal) && isFish(lunch))) && (relaxed || !(lunch.isInformal && meal.isInformal)) && (relaxed || !(lunch.hasConcentratedCarb && meal.hasConcentratedCarb)) && (relaxed || !meal.hasConcentratedCarb || dinnerCarbs < input.settings.maxDinnerCarbs));
    if (!dinnerChoices.length) return null;
    const dinner = choose(dinnerChoices, rng, (meal) => weight(meal, "dinner", dinners, recent, lunch) + (input.settings.varietyMode === "practical" && meal.isBatchCooking ? SCORE.practicalBatch : 0)); dinners.push(dinner); items.push({ day, slot: "dinner", meal: dinner });
  }
  let score = 0; for (const item of items) score += weight(item.meal, item.slot, item.slot === "lunch" ? lunches : dinners, recent);
  return { items, score, relaxed };
}
export function generateMenu(input: GenerationInput): GeneratedMenu {
  const rng = random(input.seed ?? Date.now()); const candidates: GeneratedMenu[] = [];
  for (let index = 0; index < input.settings.candidateCount; index++) { const menu = build(input, rng, false) ?? build(input, rng, true); if (menu) candidates.push(menu); }
  if (!candidates.length) throw new Error("No hay platos activos suficientes para generar una semana.");
  candidates.sort((a, b) => b.score - a.score); const top = candidates.slice(0, Math.min(10, candidates.length));
  return top[Math.floor(rng() * top.length)]!;
}

export function replacementOptions(input: GenerationInput, current: MenuItem, other: MenuItem, allItems: MenuItem[], limit: number) {
  const usedIds = new Set(allItems.filter((item) => item !== current).map((item) => item.meal.id));
  const base = input.meals.filter((meal) => meal.slot === current.slot && meal.id !== current.meal.id && !usedIds.has(meal.id) && meal.active && meal.preference !== "rejected" && meal.vegetablesRequired);
  const compatible = base.filter((meal) => {
    if (meal.proteinFamily === other.meal.proteinFamily) return false;
    if (isFish(meal) && isFish(other.meal)) return false;
    if (meal.isInformal && other.meal.isInformal) return false;
    return !(meal.hasConcentratedCarb && other.meal.hasConcentratedCarb);
  });
  const candidates = compatible.length ? compatible : base;
  const selected = allItems.filter((item) => item.slot === current.slot && item !== current).map((item) => item.meal);
  return candidates.sort((a, b) => weight(b, current.slot, selected, new Set(input.recentMealIds), other.meal) - weight(a, current.slot, selected, new Set(input.recentMealIds), other.meal)).slice(0, limit);
}
