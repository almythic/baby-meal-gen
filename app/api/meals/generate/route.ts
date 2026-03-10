import { NextResponse } from "next/server";
import { generateMeal } from "@/lib/meal-engine";
import { DEMO_INGREDIENTS, DEMO_TEMPLATES } from "@/lib/demo-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const at = searchParams.get("at");

  const meal = generateMeal({
    ingredients: DEMO_INGREDIENTS,
    templates: DEMO_TEMPLATES,
    at: at ? new Date(at) : new Date(),
    ageMonths: 8
  });

  return NextResponse.json(meal);
}
