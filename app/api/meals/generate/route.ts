import { NextResponse } from "next/server";
import { generateMeal } from "@/lib/meal-engine";
import { EXTENSIVE_INGREDIENTS, EXTENSIVE_TEMPLATES } from "@/lib/extensive-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const at = searchParams.get("at");

  const meal = generateMeal({
    ingredients: EXTENSIVE_INGREDIENTS,
    templates: EXTENSIVE_TEMPLATES,
    at: at ? new Date(at) : new Date(),
    ageMonths: 8
  });

  return NextResponse.json(meal);
}
