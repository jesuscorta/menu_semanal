import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type SeedIngredient = { name: string; quantity_laura: number | null; quantity_jesus: number | null; unit: string | null; quantity_note: string | null; quantity_text_laura: string | null; quantity_text_jesus: string | null; quantity_shared_text: string | null; weight_state: string; display_order: number };
type SeedMeal = { slug: string; name: string; meal_type: "lunch" | "dinner"; functional_type: string; protein_family: string; carb_family: string | null; has_concentrated_carb: boolean; is_informal: boolean; cooking_method: string; source_reference: string; notes: string | null; ingredients: SeedIngredient[] };

const functional = new Set(["protein_vegetables", "protein_carb_vegetables", "traditional_legume", "reinforced_legume", "complete_salad", "flexible_meal", "eggs_with_sides", "complete_protein_salad", "controlled_informal", "double_protein"]);
const ignored = /^(Proteína|Familia proteica|Fruta|Fuente|Tipo funcional|Mismo nombre|Mantener como|Cantidad:|No reinterpretar|Posibles pescados|Opciones:|Plancha\.|Horno o plancha\.|Sin pan\.|Pan:|El documento|Conservar como|Ingrediente extra|Especias|Pimienta|Limón|Perejil|Albahaca|Un chorrito)/i;

function slugify(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
type Metadata = [string, string | null, boolean, boolean, string];
const metadata: Record<string, Metadata> = {
  L01: ["mixed", "potato", true, false, "horno"], L02: ["pork", "potato", true, false, "plancha y horno"], L03: ["legumes", "legume", true, false, "cocción"], L04: ["oily_fish", "rice", true, false, "cocción"], L05: ["poultry", "legume", true, false, "salteado"], L06: ["beef", "pasta", true, false, "cocción"], L07: ["white_fish", "none", false, false, "plancha u horno"], L08: ["pork", "potato", true, false, "plancha y horno"], L09: ["pork", "none", false, false, "ensalada"], L11: ["beef", "none", false, false, "plancha"], L12: ["oily_fish", "gnocchi", true, false, "salteado"], L13: ["beef", "none", false, false, "plancha"], L14: ["legumes", "legume", true, false, "cocción"], L15: ["mixed", "none", false, false, "plancha"], L16: ["seafood_cephalopod", "legume", true, false, "cocción"], L17: ["eggs", "none", false, false, "plancha"], L18: ["pork", "rice", true, false, "cocción"], L19: ["poultry", "pasta", true, false, "cocción"], L20: ["legumes", "legume", true, false, "ensalada"], L21: ["beef", "noodles", true, false, "wok"], L22: ["plant_protein", "none", false, false, "horno"], L23: ["beef", "potato", true, true, "horno"], L24: ["white_fish", "rice", true, false, "horno"], L25: ["legumes", "legume", true, false, "cocción"], L26: ["poultry", "none", false, false, "plancha"], L27: ["white_fish", "none", false, false, "plancha"], L28: ["beef", "mixed", true, false, "curry"], L29: ["white_fish", "potato", true, false, "horno"], L30: ["poultry", "none", false, false, "wok"],
  D01: ["white_fish", "none", false, false, "horno"], D02: ["poultry", "none", false, false, "plancha"], D03: ["oily_fish", "none", false, false, "plancha"], D04: ["eggs", "none", false, false, "tortilla"], D05: ["beef", "none", false, true, "plancha"], D06: ["oily_fish", "none", false, false, "ensalada"], D07: ["oily_fish", "none", false, false, "ensalada"], D08: ["eggs", "none", false, false, "tortilla"], D09: ["beef", "none", false, true, "plancha"], D10: ["beef", "none", false, false, "plancha"], D11: ["oily_fish", "none", false, false, "horno o plancha"], D12: ["poultry", "none", false, false, "plancha"], D13: ["white_fish", "none", false, false, "horno"], D14: ["poultry", "none", false, false, "plancha"], D15: ["eggs", "none", false, false, "tortilla"], D16: ["poultry", "none", false, false, "horno"], D17: ["oily_fish", "none", false, false, "ensalada"], D18: ["beef", "none", false, true, "plancha"], D19: ["mixed", "none", false, false, "plancha y revuelto"], D20: ["white_fish", "none", false, false, "horno o plancha"], D21: ["poultry", "none", false, false, "puré y plancha"], D22: ["poultry", "wrap", true, true, "plancha"], D23: ["poultry", "none", false, false, "plancha"], D24: ["eggs", "none", false, false, "tortilla"], D25: ["oily_fish", "none", false, false, "ensalada"], D26: ["eggs", "none", false, false, "tortilla"], D27: ["seafood_cephalopod", "none", false, false, "plancha"], D28: ["poultry", "wrap", true, true, "plancha"], D29: ["seafood_cephalopod", "none", false, false, "ensalada"], D30: ["eggs", "none", false, false, "cocción"],
};
function amount(text: string | null) {
  if (!text) return { number: null, unit: null };
  const match = text.trim().match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
  return match ? { number: Number(match[1].replace(",", ".")), unit: match[2].trim() || null } : { number: null, unit: null };
}
function quantities(note: string | null) {
  if (!note) return { quantity_laura: null, quantity_jesus: null, unit: null, quantity_text_laura: null, quantity_text_jesus: null, quantity_shared_text: null };
  if (/(común|para ambos|no diferencia persona)/i.test(note)) return { quantity_laura: null, quantity_jesus: null, unit: null, quantity_text_laura: null, quantity_text_jesus: null, quantity_shared_text: note };
  const parts = note.split(/\s+\/\s+/).map((part) => part.trim()); const laura = parts[0] || null; const jesus = parts.length === 2 ? parts[1] || null : laura;
  const lauraAmount = amount(laura); const jesusAmount = amount(jesus);
  const unit = lauraAmount.unit && lauraAmount.unit === jesusAmount.unit ? lauraAmount.unit : null;
  return { quantity_laura: lauraAmount.number, quantity_jesus: jesusAmount.number, unit, quantity_text_laura: laura, quantity_text_jesus: jesus, quantity_shared_text: null };
}
function parse(markdown: string): SeedMeal[] {
  const section = markdown.slice(markdown.indexOf("# A. ALMUERZOS"), markdown.indexOf("# C. PLATOS"));
  const blocks = section.split(/(?=## [LD]\d{2} — )/).filter((block) => /^## [LD]\d{2} — /.test(block) && !block.startsWith("## L10"));
  return blocks.map((block) => {
    const [heading, ...lines] = block.split("\n"); const match = heading.match(/^## ([LD]\d{2}) — (.+)$/)!;
    const isLunch = match[1].startsWith("L"); const type = lines.map((line) => line.match(/Tipo funcional: `([^`]+)`/)?.[1]).find(Boolean) ?? "protein_vegetables"; const nutrition = metadata[match[1]];
    if (!nutrition) throw new Error(`Falta taxonomía nutricional para ${match[1]}.`);
    const ingredientLines = lines.filter((line) => line.startsWith("- ") && !ignored.test(line.slice(2)) && !line.includes("Tipo funcional:"));
    const notes = lines.filter((line) => line.startsWith("- ") && /(LIBRE|opcional|Sin pan|Ingrediente extra|Posibles pescados|Opciones:|no indica|ambigua)/i.test(line)).map((line) => line.slice(2).replace(/\.$/, "")).join(" · ") || null;
    return { slug: slugify(match[2]), name: match[2], meal_type: isLunch ? "lunch" : "dinner", functional_type: functional.has(type) ? type : "protein_vegetables", protein_family: nutrition[0], carb_family: nutrition[1], has_concentrated_carb: nutrition[2], is_informal: nutrition[3], cooking_method: nutrition[4], source_reference: match[1] === "L03" ? "L03; L10" : match[1], notes, ingredients: ingredientLines.map((line, index) => {
      const value = line.slice(2).replace(/\.$/, ""); const [name, ...rest] = value.split(":");
      const quantity_note = rest.join(":").trim() || null;
      return { name: name.trim(), quantity_note, ...quantities(quantity_note), weight_state: /en seco/i.test(value) ? "dry" : /cocid[oa]s?/i.test(value) ? "cooked" : "unspecified", display_order: index };
    }).filter((item) => item.name) };
  });
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Define NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.");
  const meals = parse(await readFile(path.resolve("SEED_MEALS.md"), "utf8")); const supabase = createClient(url, key);
  for (const meal of meals) {
    const { ingredients, ...row } = meal;
    const { data, error } = await supabase.from("meals").upsert({ ...row, source_type: "original_menu", vegetables_required: true, fruit_dessert: true, difficulty: "easy" }, { onConflict: "slug" }).select("id").single();
    if (error || !data) throw error ?? new Error(`No se pudo guardar ${meal.name}`);
    await supabase.from("meal_ingredients").delete().eq("meal_id", data.id);
    if (ingredients.length) { const { error: ingredientError } = await supabase.from("meal_ingredients").insert(ingredients.map((ingredient) => ({ ...ingredient, meal_id: data.id, ingredient_group: "original", is_optional: false }))); if (ingredientError) throw ingredientError; }
  }
  console.log(`Importados ${meals.length} registros originales.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
