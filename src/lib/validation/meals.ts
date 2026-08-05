import { z } from "zod";

const quantity = z.number().nonnegative().nullable();

export const ingredientSchema = z.object({
  name: z.string().trim().min(1, "El ingrediente es obligatorio."),
  ingredientGroup: z.string().trim().min(1),
  quantityLaura: quantity,
  quantityJesus: quantity,
  unit: z.string().trim().nullable(),
  quantityNote: z.string().trim().nullable(),
  weightState: z.enum(["raw", "cooked", "dry", "not_applicable", "unspecified"]),
  isOptional: z.boolean(),
  displayOrder: z.number().int().nonnegative(),
}).refine((value) => value.quantityLaura !== null || value.quantityJesus !== null || value.quantityNote, {
  message: "Indica una cantidad o una nota para el ingrediente.",
});

export const mealSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  mealType: z.enum(["lunch", "dinner"]),
  functionalType: z.string().trim().min(1),
  proteinFamily: z.string().trim().min(1),
  carbFamily: z.string().trim().nullable(),
  cookingMethod: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "advanced"]),
  estimatedMinutes: z.number().int().positive().nullable(),
  vegetablesRequired: z.boolean(), fruitDessert: z.boolean(), hasConcentratedCarb: z.boolean(),
  isInformal: z.boolean(), isBatchCooking: z.boolean(), canRepeatNextDay: z.boolean(), active: z.boolean(),
  preferenceStatus: z.enum(["favorite", "normal", "avoid", "rejected"]), notes: z.string().trim().nullable(),
  ingredients: z.array(ingredientSchema).min(1, "Un plato activo necesita al menos un ingrediente."),
}).superRefine((value, context) => {
  if (value.active && !value.ingredients.length) context.addIssue({ code: "custom", message: "Un plato activo necesita ingredientes." });
});

export type MealInput = z.infer<typeof mealSchema>;
