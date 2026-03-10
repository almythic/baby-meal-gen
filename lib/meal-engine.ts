export type Category = "vegetable" | "protein" | "fruit" | "grain";
export type MealSlot = "breakfast" | "lunch" | "dinner";

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: Category;
  babySafeFromMonths: number;
  macrosPer100g: Macros;
  tags: string[];
}

export interface TemplateRequirement {
  grams: number;
  category?: Category;
  anyOfTags?: string[];
  optional?: boolean;
}

export interface MealTemplate {
  id: string;
  slot: MealSlot;
  title: string;
  requirements: TemplateRequirement[];
}

export interface GeneratedMeal {
  slot: MealSlot;
  title: string;
  ingredients: Array<{
    ingredientId: string;
    name: string;
    grams: number;
    macros: Macros;
  }>;
  totals: Macros;
  chartData: {
    labels: string[];
    grams: number[];
    caloriesFromMacro: number[];
    totalCalories: number;
  };
  benefits: string[];
}

const ZERO: Macros = { calories: 0, protein: 0, carbs: 0, fat: 0 };

const round = (n: number): number => Math.round(n * 10) / 10;

const scaleMacros = (macros: Macros, grams: number): Macros => ({
  calories: round((macros.calories * grams) / 100),
  protein: round((macros.protein * grams) / 100),
  carbs: round((macros.carbs * grams) / 100),
  fat: round((macros.fat * grams) / 100)
});

const addMacros = (a: Macros, b: Macros): Macros => ({
  calories: round(a.calories + b.calories),
  protein: round(a.protein + b.protein),
  carbs: round(a.carbs + b.carbs),
  fat: round(a.fat + b.fat)
});

export function detectMealSlot(at = new Date()): MealSlot {
  const hour = at.getHours();

  if (hour < 11) return "breakfast";
  if (hour < 16) return "lunch";
  return "dinner";
}

function matchesRequirement(
  ingredient: Ingredient,
  req: TemplateRequirement,
  ageMonths: number
): boolean {
  if (ingredient.babySafeFromMonths > ageMonths) return false;
  if (req.category && ingredient.category !== req.category) return false;
  if (req.anyOfTags && !req.anyOfTags.some((tag) => ingredient.tags.includes(tag))) {
    return false;
  }

  return true;
}

function scoreIngredient(
  ingredient: Ingredient,
  slot: MealSlot,
  req: TemplateRequirement,
  alreadyPicked: Ingredient[]
): number {
  let score = 0;

  if (req.category && ingredient.category === req.category) score += 5;
  if (req.anyOfTags?.some((tag) => ingredient.tags.includes(tag))) score += 8;

  if (slot === "breakfast") {
    if (ingredient.category === "grain") score += 4;
    if (ingredient.category === "fruit") score += 3;
    if (ingredient.tags.includes("healthy_fat")) score += 2;
    if (ingredient.tags.includes("choline")) score += 2;
    if (ingredient.tags.includes("heme_iron")) score -= 2;
  }

  if (slot === "lunch") {
    if (ingredient.tags.includes("heme_iron")) score += 7;
    if (ingredient.tags.includes("iron_rich")) score += 5;
    if (ingredient.tags.includes("vitamin_c")) score += 5;
    if (ingredient.tags.includes("beta_carotene")) score += 3;
    if (ingredient.tags.includes("healthy_fat")) score += 2;
  }

  if (slot === "dinner") {
    if (ingredient.category === "vegetable") score += 2;
    if (ingredient.category === "protein") score += 2;
    if (ingredient.tags.includes("easy_digest")) score += 3;
  }

  const pickedTags = new Set(alreadyPicked.flatMap((i) => i.tags));

  if (
    (pickedTags.has("iron_rich") || pickedTags.has("heme_iron")) &&
    ingredient.tags.includes("vitamin_c")
  ) {
    score += 4;
  }

  if (pickedTags.has("beta_carotene") && ingredient.tags.includes("healthy_fat")) {
    score += 3;
  }

  if (pickedTags.has("healthy_fat") && ingredient.tags.includes("beta_carotene")) {
    score += 3;
  }

  return score;
}

function buildBenefits(picked: Ingredient[]): string[] {
  const tags = new Set(picked.flatMap((i) => i.tags));
  const benefits: string[] = [];

  if (tags.has("heme_iron") || tags.has("iron_rich")) {
    benefits.push("Iron-rich ingredients support growth and healthy blood development.");
  }

  if ((tags.has("heme_iron") || tags.has("iron_rich")) && tags.has("vitamin_c")) {
    benefits.push("Vitamin C in this meal helps the body make better use of iron.");
  }

  if (tags.has("choline")) {
    benefits.push("Choline supports brain and nervous-system development.");
  }

  if (tags.has("beta_carotene")) {
    benefits.push("Orange vegetables add carotenoid support for vision and immune function.");
  }

  if (tags.has("beta_carotene") && tags.has("healthy_fat")) {
    benefits.push("Healthy fat complements the carotenoid-rich vegetables in this meal.");
  }

  if (picked.some((i) => i.category === "grain") && picked.some((i) => i.category === "fruit")) {
    benefits.push("Grain and fruit together provide familiar flavor and steady energy.");
  }

  return benefits;
}

function buildFromTemplate(
  template: MealTemplate,
  ingredients: Ingredient[],
  ageMonths: number
): GeneratedMeal | null {
  const used = new Set<string>();
  const chosenIngredients: Ingredient[] = [];
  const chosen: GeneratedMeal["ingredients"] = [];

  for (const req of template.requirements) {
    const candidate = ingredients
      .filter((i) => !used.has(i.id))
      .filter((i) => matchesRequirement(i, req, ageMonths))
      .sort(
        (a, b) =>
          scoreIngredient(b, template.slot, req, chosenIngredients) -
          scoreIngredient(a, template.slot, req, chosenIngredients)
      )[0];

    if (!candidate) {
      if (req.optional) continue;
      return null;
    }

    used.add(candidate.id);
    chosenIngredients.push(candidate);
    chosen.push({
      ingredientId: candidate.id,
      name: candidate.name,
      grams: req.grams,
      macros: scaleMacros(candidate.macrosPer100g, req.grams)
    });
  }

  const totals = chosen.reduce((sum, item) => addMacros(sum, item.macros), ZERO);

  return {
    slot: template.slot,
    title: template.title,
    ingredients: chosen,
    totals,
    chartData: {
      labels: ["Protein", "Carbs", "Fat"],
      grams: [totals.protein, totals.carbs, totals.fat],
      caloriesFromMacro: [round(totals.protein * 4), round(totals.carbs * 4), round(totals.fat * 9)],
      totalCalories: totals.calories
    },
    benefits: buildBenefits(chosenIngredients)
  };
}

export function generateMeal(params: {
  ingredients: Ingredient[];
  templates: MealTemplate[];
  at?: Date;
  ageMonths?: number;
  slot?: MealSlot;
}): GeneratedMeal {
  const ageMonths = params.ageMonths ?? 8;
  const slot = params.slot ?? detectMealSlot(params.at);

  const options = params.templates
    .filter((t) => t.slot === slot)
    .map((t) => buildFromTemplate(t, params.ingredients, ageMonths))
    .filter((x): x is GeneratedMeal => x !== null);

  if (!options.length) {
    throw new Error(`No valid meal could be generated for slot "${slot}"`);
  }

  return options.sort((a, b) => {
    if (slot === "lunch") return b.totals.protein - a.totals.protein;
    if (slot === "breakfast") return b.totals.carbs - a.totals.carbs;
    return a.totals.calories - b.totals.calories;
  })[0];
}
