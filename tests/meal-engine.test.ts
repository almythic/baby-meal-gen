import { describe, expect, it } from "vitest";
import { DEMO_INGREDIENTS, DEMO_TEMPLATES } from "../lib/demo-data";
import { detectMealSlot, generateMeal } from "../lib/meal-engine";

describe("detectMealSlot", () => {
  it("detects breakfast", () => {
    expect(detectMealSlot(new Date("2026-03-09T08:00:00.000Z"))).toBe("breakfast");
  });

  it("detects lunch", () => {
    expect(detectMealSlot(new Date("2026-03-09T13:30:00.000Z"))).toBe("lunch");
  });

  it("detects dinner", () => {
    expect(detectMealSlot(new Date("2026-03-09T18:00:00.000Z"))).toBe("dinner");
  });
});

describe("generateMeal", () => {
  it("creates a deterministic lunch plan with expected benefits", () => {
    const meal = generateMeal({
      ingredients: DEMO_INGREDIENTS,
      templates: DEMO_TEMPLATES,
      slot: "lunch",
      ageMonths: 8
    });

    expect(meal.title).toBe("Iron + vitamin C power puree");
    expect(meal.ingredients).toHaveLength(3);
    expect(meal.benefits).toContain("Vitamin C in this meal helps the body make better use of iron.");
    expect(meal.chartData.labels).toEqual(["Protein", "Carbs", "Fat"]);
  });

  it("throws when no valid template can be built", () => {
    expect(() =>
      generateMeal({
        ingredients: DEMO_INGREDIENTS.filter((i) => i.category === "fruit"),
        templates: DEMO_TEMPLATES,
        slot: "dinner",
        ageMonths: 8
      })
    ).toThrowError('No valid meal could be generated for slot "dinner"');
  });
});
