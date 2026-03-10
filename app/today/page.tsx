import { generateMeal, MealSlot } from "@/lib/meal-engine";
import { EXTENSIVE_INGREDIENTS, EXTENSIVE_TEMPLATES } from "@/lib/extensive-data";
import RegenerateButton from "@/components/RegenerateButton";
import MealCard from "@/components/MealCard";

export default async function TodayPage() {
  const slots: MealSlot[] = ["breakfast", "lunch", "dinner"];

  // Generate a distinct meal for each slot
  const dailyMeals = slots.map((slot) => {
    return generateMeal({
      ingredients: EXTENSIVE_INGREDIENTS,
      templates: EXTENSIVE_TEMPLATES,
      ageMonths: 8,
      slot,
    });
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 pb-16">
      <header className="text-center p-8 border-b border-indigo-200/50">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent mb-4">
          Today&apos;s Meal Plan
        </h1>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          Nutritionally balanced and developmentally appropriate meals for your little one across the whole day.
        </p>
        <RegenerateButton />
      </header>

      {dailyMeals.map((meal, idx) => (
        <MealCard key={`${meal.slot}-${idx}`} initialMeal={meal} />
      ))}
    </div>
  );
}
