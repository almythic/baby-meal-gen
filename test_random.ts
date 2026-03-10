import { generateMeal } from "./lib/meal-engine";
import { EXTENSIVE_INGREDIENTS, EXTENSIVE_TEMPLATES } from "./lib/extensive-data";

for (let i = 0; i < 5; i++) {
    const meal = generateMeal({
        ingredients: EXTENSIVE_INGREDIENTS,
        templates: EXTENSIVE_TEMPLATES,
        slot: "breakfast",
    });
    console.log(`Run ${i}: Template ${meal.templateId}, Ingredients: ${meal.ingredients.map(x => x.name).join(", ")}`);
}
