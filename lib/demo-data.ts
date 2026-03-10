import type { Ingredient, MealTemplate } from "./meal-engine";

export const DEMO_INGREDIENTS: Ingredient[] = [
  {
    id: "rolled_oats",
    name: "Rolled oats",
    category: "grain",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
    tags: ["energy", "fiber", "breakfast_preferred"]
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruit",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    tags: ["fruit", "easy_digest"]
  },
  {
    id: "pear",
    name: "Pear",
    category: "fruit",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 57, protein: 0.4, carbs: 15.2, fat: 0.1 },
    tags: ["fruit", "easy_digest"]
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "vegetable",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
    tags: ["healthy_fat", "fiber"]
  },
  {
    id: "turkey_breast",
    name: "Turkey breast",
    category: "protein",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 135, protein: 29, carbs: 0, fat: 1 },
    tags: ["iron_rich", "heme_iron", "protein", "lunch_preferred"]
  },
  {
    id: "egg",
    name: "Egg",
    category: "protein",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 },
    tags: ["protein", "choline", "healthy_fat"]
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetable",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4 },
    tags: ["vitamin_c", "fiber", "green_veg"]
  },
  {
    id: "sweet_potato",
    name: "Sweet potato",
    category: "vegetable",
    babySafeFromMonths: 6,
    macrosPer100g: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    tags: ["beta_carotene", "vitamin_c", "energy"]
  }
];

export const DEMO_TEMPLATES: MealTemplate[] = [
  {
    id: "breakfast_grain_fruit",
    slot: "breakfast",
    title: "Morning grain + fruit bowl",
    requirements: [
      { category: "grain", grams: 25 },
      { category: "fruit", grams: 40 },
      { anyOfTags: ["healthy_fat", "choline"], grams: 15, optional: true }
    ]
  },
  {
    id: "lunch_iron_vitc",
    slot: "lunch",
    title: "Iron + vitamin C power puree",
    requirements: [
      { anyOfTags: ["heme_iron", "iron_rich"], grams: 35 },
      { anyOfTags: ["vitamin_c"], grams: 40 },
      { anyOfTags: ["beta_carotene", "healthy_fat"], grams: 30 }
    ]
  },
  {
    id: "dinner_gentle_puree",
    slot: "dinner",
    title: "Gentle evening puree",
    requirements: [
      { category: "vegetable", grams: 50 },
      { category: "protein", grams: 25 },
      { category: "grain", grams: 15, optional: true }
    ]
  }
];
