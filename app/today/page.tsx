import { generateMeal } from "@/lib/meal-engine";
import { DEMO_INGREDIENTS, DEMO_TEMPLATES } from "@/lib/demo-data";

export default async function TodayPage() {
  const meal = generateMeal({
    ingredients: DEMO_INGREDIENTS,
    templates: DEMO_TEMPLATES,
    ageMonths: 8
  });

  return (
    <main style={{ fontFamily: "sans-serif", padding: "1.5rem", maxWidth: 780 }}>
      <h1>Today&apos;s Meal Plan</h1>
      <p>
        <strong>{meal.title}</strong> ({meal.slot})
      </p>
      <h2>Ingredients</h2>
      <ul>
        {meal.ingredients.map((item) => (
          <li key={item.ingredientId}>
            {item.name}: {item.grams}g ({item.macros.calories} kcal)
          </li>
        ))}
      </ul>
      <h2>Totals</h2>
      <p>
        Calories: {meal.totals.calories} kcal | Protein: {meal.totals.protein}g | Carbs: {meal.totals.carbs}g
        | Fat: {meal.totals.fat}g
      </p>
      <h2>Benefits</h2>
      <ul>
        {meal.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </main>
  );
}
