"use server";

import { GeneratedMeal, swapIngredient } from "@/lib/meal-engine";
import { EXTENSIVE_INGREDIENTS, EXTENSIVE_TEMPLATES } from "@/lib/extensive-data";

export async function swapIngredientAction(meal: GeneratedMeal, swapOutId: string): Promise<GeneratedMeal> {
    // In a real database scenario, we'd verify the user and fetch ingredients from DB here.
    // For now, we use our extensive dataset securely on the server.
    try {
        const newMeal = swapIngredient({
            meal,
            swapOutId,
            ingredients: EXTENSIVE_INGREDIENTS,
            templates: EXTENSIVE_TEMPLATES,
            ageMonths: 8,
        });
        return newMeal;
    } catch (err: any) {
        console.error("Swap failed", err);
        throw new Error(err.message || "Failed to swap ingredient");
    }
}
