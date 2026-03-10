"use client";

import { useState, useTransition } from "react";
import { GeneratedMeal, Category } from "@/lib/meal-engine";
import MacroChart from "@/components/MacroChart";
import { CheckCircle2, Flame, Droplets, Beef, Carrot, Wheat, Cherry, RefreshCw } from "lucide-react";
import { swapIngredientAction } from "@/app/actions";

const getIconForCategory = (category: Category) => {
    switch (category) {
        case "vegetable":
            return <Carrot size={20} />;
        case "fruit":
            return <Cherry size={20} />;
        case "grain":
            return <Wheat size={20} />;
        case "fat":
            return <Droplets size={20} />;
        case "protein":
        default:
            return <Beef size={20} />;
    }
};

export default function MealCard({ initialMeal }: { initialMeal: GeneratedMeal }) {
    const [meal, setMeal] = useState<GeneratedMeal>(initialMeal);
    const [isPending, startTransition] = useTransition();
    const [swappingId, setSwappingId] = useState<string | null>(null);

    const handleSwap = (ingredientId: string) => {
        setSwappingId(ingredientId);
        startTransition(async () => {
            try {
                const updatedMeal = await swapIngredientAction(meal, ingredientId);
                setMeal(updatedMeal);
            } catch (err) {
                alert("No suitable alternative found for this ingredient. Try regenerating the entire meal instead!");
            } finally {
                setSwappingId(null);
            }
        });
    };

    return (
        <article className="flex flex-col gap-6">
            <div className="text-center">
                <span className="inline-block px-4 py-1 bg-indigo-400 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-2">
                    {meal.slot}
                </span>
                <p className="text-2xl text-indigo-600 font-medium">{meal.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                {/* Ingredients & Totals Section */}
                <section className="bg-white/80 backdrop-blur-md border border-indigo-200/50 rounded-3xl shadow-lg p-6 hover:shadow-xl hover:bg-white/95 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-800">
                        <CheckCircle2 size={24} />
                        Ingredients
                    </h2>
                    <ul className="flex flex-col gap-4 list-none relative">
                        {isPending && (
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 rounded-2xl flex items-center justify-center">
                                {/* subtle loading overlay */}
                            </div>
                        )}
                        {meal.ingredients.map((item) => (
                            <li key={item.ingredientId} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-transparent hover:bg-white hover:border-indigo-300 hover:translate-x-1 transition-all duration-300 relative group">
                                <div className="text-indigo-600 bg-indigo-100/50 p-2 rounded-xl flex items-center justify-center shrink-0">
                                    {getIconForCategory(item.category)}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">{item.grams}g</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="text-sm font-semibold text-indigo-600">
                                        {item.macros.calories} kcal
                                    </div>
                                    <button
                                        onClick={() => handleSwap(item.ingredientId)}
                                        disabled={isPending}
                                        className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                        title="Swap for a similar ingredient"
                                    >
                                        <RefreshCw size={14} className={swappingId === item.ingredientId ? "animate-spin text-indigo-600" : ""} />
                                        Swap
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        <div className="text-center p-4 bg-white/50 rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="text-xl font-bold text-indigo-800 mb-1">{meal.totals.protein}g</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Protein</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="text-xl font-bold text-indigo-800 mb-1">{meal.totals.carbs}g</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Carbs</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="text-xl font-bold text-indigo-800 mb-1">{meal.totals.fat}g</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Fat</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="text-xl font-bold text-indigo-800 mb-1">{meal.totals.calories}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
                                <Flame size={12} /> kcal
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart & Benefits Section */}
                <section className="bg-white/80 backdrop-blur-md border border-indigo-200/50 rounded-3xl shadow-lg p-6 hover:shadow-xl hover:bg-white/95 transition-all duration-300 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-800">
                        <Droplets size={24} />
                        Macros & Benefits
                    </h2>

                    <MacroChart data={meal.chartData} />

                    <div className="grid grid-cols-1 gap-4 mt-6">
                        {meal.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-white/80 to-white/40 border-l-4 border-indigo-600 rounded-r-2xl rounded-l-md hover:translate-x-1 hover:bg-white transition-all duration-300">
                                <p className="text-sm font-medium text-slate-900 leading-relaxed">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
}
