export type Slot = "lunch" | "dinner";
export type ProteinFamily = "poultry" | "pork" | "beef" | "white_fish" | "oily_fish" | "seafood_cephalopod" | "eggs" | "legumes" | "plant_protein" | "mixed";
export type Preference = "favorite" | "normal" | "avoid" | "rejected";
export type MealCandidate = { id: string; name: string; slot: Slot; functionalType: string; proteinFamily: ProteinFamily; active: boolean; preference: Preference; hasConcentratedCarb: boolean; isInformal: boolean; isBatchCooking: boolean; vegetablesRequired: boolean; ingredients?: unknown[] };
export type MenuItem = { day: number; slot: Slot; meal: MealCandidate };
export type GeneratorSettings = { maxDinnerCarbs: number; varietyMode: "variety" | "balanced" | "practical"; candidateCount: number };
export type GenerationInput = { meals: MealCandidate[]; recentMealIds: string[]; settings: GeneratorSettings; seed?: number };
export type GeneratedMenu = { items: MenuItem[]; score: number; relaxed: boolean };
