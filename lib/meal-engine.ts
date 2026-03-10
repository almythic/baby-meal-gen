export type Category = "vegetable" | "protein" | "fruit" | "grain" | "fat";
export type MealSlot = "breakfast" | "lunch" | "dinner";
export type Flavor = "savory" | "sweet" | "neutral";

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
  flavor: Flavor;
  babySafeFromMonths: number;
  macrosPer100g: Macros;
  tags: string[];
}

export interface TemplateRequirement {
  grams: number;
  category?: Category;
  flavor?: Flavor;
  anyOfTags?: string[];
  optional?: boolean;
}

export interface MealTemplate {
  id: string;
  slot: MealSlot;
  flavorProfile: "savory" | "sweet";
  title: string;
  requirements: TemplateRequirement[];
}

export interface GeneratedMeal {
  templateId: string;
  slot: MealSlot;
  title: string;
  ingredients: Array<{
    ingredientId: string;
    name: string;
    category: Category;
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
  ageMonths: number,
  templateFlavor?: "savory" | "sweet"
): boolean {
  if (ingredient.babySafeFromMonths > ageMonths) return false;

  // Prevent mixing sweet and savory
  if (templateFlavor === "savory" && ingredient.flavor === "sweet") return false;
  if (templateFlavor === "sweet" && ingredient.flavor === "savory") return false;

  if (req.category && ingredient.category !== req.category) return false;
  if (req.flavor && ingredient.flavor !== req.flavor) return false;
  if (req.anyOfTags && !req.anyOfTags.some((tag) => ingredient.tags.includes(tag))) {
    return false;
  }

  return true;
}

function formatIngredientName(name: string): string {
  return name.replace(/\s*\(.*?\)\s*/g, '').trim();
}

function generateDynamicTitle(slot: MealSlot, ingredients: GeneratedMeal["ingredients"]): string {
  const protein = ingredients.find(i => i.category === "protein");
  const grain = ingredients.find(i => i.category === "grain");
  const veg = ingredients.find(i => i.category === "vegetable");
  const fruit = ingredients.find(i => i.category === "fruit");

  const components: string[] = [];

  if (protein) components.push(formatIngredientName(protein.name));
  else if (fruit) components.push(formatIngredientName(fruit.name));

  if (veg) components.push(formatIngredientName(veg.name));
  else if (grain) components.push(formatIngredientName(grain.name));

  if (components.length >= 2) {
    const base = `${components[0]} & ${components[1]}`;
    if (slot === "breakfast") return `${base} Bowl`;
    if (slot === "lunch") return `${base} Puree`;
    if (slot === "dinner") return `${base} Mash`;
    return `${base} Meal`;
  }

  if (components.length === 1) {
    return `${components[0]} Meal`;
  }

  return "Nourishing Baby Meal";
}

function scoreIngredient(
  ingredient: Ingredient,
  slot: MealSlot,
  req: TemplateRequirement,
  alreadyPicked: Ingredient[]
): number {
  let score = 0;

  // Add randomness to ensure varying meals on regeneration
  score += Math.random() * 5;

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
    benefits.push("Includes iron-rich foods essential for your baby's rapid growth and healthy blood development, especially critical after 6 months.");
  }

  if ((tags.has("heme_iron") || tags.has("iron_rich")) && tags.has("vitamin_c")) {
    benefits.push("Pairs iron with Vitamin C, which significantly enhances the body's ability to absorb iron from plant sources.");
  }

  if (tags.has("choline")) {
    benefits.push("Provides Choline, a vital nutrient that acts as a building block for the brain and nervous system.");
  }

  if (tags.has("beta_carotene")) {
    benefits.push("Features orange vegetables rich in Beta-Carotene, supporting vision development and a strong immune system.");
  }

  if (tags.has("beta_carotene") && tags.has("healthy_fat")) {
    benefits.push("Pairs carotenoids with healthy fats to help your baby's body absorb these important fat-soluble vitamins.");
  }

  if (picked.some((i) => i.category === "grain") && picked.some((i) => i.category === "fruit")) {
    benefits.push("Combines whole grains and fruit to provide a familiar flavor profile along with steady, long-lasting energy.");
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
      .filter((i) => matchesRequirement(i, req, ageMonths, template.flavorProfile))
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
      category: candidate.category,
      grams: req.grams,
      macros: scaleMacros(candidate.macrosPer100g, req.grams)
    });
  }

  const totals = chosen.reduce((sum, item) => addMacros(sum, item.macros), ZERO);

  return {
    templateId: template.id,
    slot: template.slot,
    title: generateDynamicTitle(template.slot, chosen),
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
    .filter((t) => {
      // Enforce: Breakfast and Lunch strictly savory, Dinner strictly sweet
      if (slot === "breakfast" || slot === "lunch") return t.flavorProfile === "savory";
      if (slot === "dinner") return t.flavorProfile === "sweet";
      return true;
    })
    .sort(() => Math.random() - 0.5) // Shuffle templates so a completely different meal is picked each time!
    .map((t) => buildFromTemplate(t, params.ingredients, ageMonths))
    .filter((x): x is GeneratedMeal => x !== null);

  if (!options.length) {
    throw new Error(`No valid meal could be generated for slot "${slot}"`);
  }

  // Since it was already shuffled, we can just grab the first one that successfully built
  return options[0];
}

export function swapIngredient(params: {
  meal: GeneratedMeal;
  swapOutId: string;
  ingredients: Ingredient[];
  templates: MealTemplate[];
  ageMonths?: number;
}): GeneratedMeal {
  const ageMonths = params.ageMonths ?? 8;
  const template = params.templates.find(t => t.id === params.meal.templateId);
  if (!template) throw new Error("Template not found for this meal");

  const itemToSwap = params.meal.ingredients.find(i => i.ingredientId === params.swapOutId);
  if (!itemToSwap) throw new Error("Ingredient to swap not found in meal");

  const swapOutIng = params.ingredients.find(i => i.id === params.swapOutId);
  if (!swapOutIng) throw new Error("Original ingredient not found in database");

  // Find which requirement this ingredient likely fulfilled
  const matchedReq = template.requirements.find(req =>
    req.grams === itemToSwap.grams && matchesRequirement(swapOutIng, req, ageMonths, template.flavorProfile)
  );

  if (!matchedReq) {
    throw new Error("Could not determine which requirement this ingredient fulfilled.");
  }

  // Find alternatives that are not already in the meal
  const currentIngredientIds = new Set(params.meal.ingredients.map(i => i.ingredientId));
  const candidates = params.ingredients
    .filter(i => !currentIngredientIds.has(i.id))
    .filter(i => matchesRequirement(i, matchedReq, ageMonths, template.flavorProfile))
    .sort((a, b) => scoreIngredient(b, template.slot, matchedReq, []) - scoreIngredient(a, template.slot, matchedReq, []));

  if (candidates.length === 0) {
    throw new Error("No suitable alternative ingredient found.");
  }

  const replacement = candidates[0]; // best alternative

  // Rebuild the meal with the replacement
  const newIngredientsList = params.meal.ingredients.map(item => {
    if (item.ingredientId === params.swapOutId) {
      return {
        ingredientId: replacement.id,
        name: replacement.name,
        category: replacement.category,
        grams: matchedReq.grams,
        macros: scaleMacros(replacement.macrosPer100g, matchedReq.grams)
      };
    }
    return item;
  });

  const totals = newIngredientsList.reduce((sum, item) => addMacros(sum, item.macros), ZERO);
  const newFullIngredients = newIngredientsList.map(item => params.ingredients.find(i => i.id === item.ingredientId)!);

  return {
    ...params.meal,
    title: generateDynamicTitle(params.meal.slot, newIngredientsList),
    ingredients: newIngredientsList,
    totals,
    chartData: {
      labels: ["Protein", "Carbs", "Fat"],
      grams: [totals.protein, totals.carbs, totals.fat],
      caloriesFromMacro: [round(totals.protein * 4), round(totals.carbs * 4), round(totals.fat * 9)],
      totalCalories: totals.calories
    },
    benefits: buildBenefits(newFullIngredients)
  };
}
