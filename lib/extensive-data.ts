import { Ingredient, MealTemplate } from "./meal-engine";

export const EXTENSIVE_INGREDIENTS: Ingredient[] = [
    // ==========================================
    // PROTEINS (Savory/Neutral)
    // ==========================================
    {
        id: "chicken_breast",
        name: "Chicken Breast",
        category: "protein",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        tags: ["iron_rich"]
    },
    {
        id: "turkey_breast",
        name: "Turkey Breast",
        category: "protein",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 147, protein: 30, carbs: 0, fat: 2 },
        tags: ["iron_rich"]
    },
    {
        id: "veal",
        name: "Veal",
        category: "protein",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 160, protein: 28, carbs: 0, fat: 5 },
        tags: ["heme_iron", "iron_rich"]
    },
    {
        id: "egg",
        name: "Egg",
        category: "protein",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
        tags: ["choline", "healthy_fat"]
    },

    // ==========================================
    // CARBOHYDRATES (Grain/Neutral)
    // ==========================================
    {
        id: "rice_semolina",
        name: "Rice Semolina (Cereal)",
        category: "grain",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 360, protein: 7, carbs: 80, fat: 1 },
        tags: ["iron_fortified", "easy_digest"]
    },
    {
        id: "rice",
        name: "Rice (Cooked)",
        category: "grain",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        tags: ["easy_digest"]
    },
    {
        id: "millet",
        name: "Millet (Cooked)",
        category: "grain",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 119, protein: 3.5, carbs: 23, fat: 1 },
        tags: ["easy_digest"]
    },
    {
        id: "rolled_oats",
        name: "Rolled Oats (Cooked)",
        category: "grain",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 71, protein: 2.5, carbs: 12, fat: 1.5 },
        tags: ["iron_fortified"]
    },
    {
        id: "cornmeal_polenta",
        name: "Cornmeal (Polenta, Cooked)",
        category: "grain",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 85, protein: 2, carbs: 18, fat: 0.2 },
        tags: []
    },

    // ==========================================
    // FATS (Fat/Neutral)
    // ==========================================
    {
        id: "olive_oil",
        name: "Extra Virgin Olive Oil",
        category: "fat",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100 },
        tags: ["healthy_fat"]
    },
    {
        id: "avocado",
        name: "Avocado",
        category: "fat",
        flavor: "neutral",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 160, protein: 2, carbs: 8.5, fat: 15 },
        tags: ["healthy_fat", "easy_digest"]
    },

    // ==========================================
    // FRUITS (Sweet)
    // ==========================================
    {
        id: "apple",
        name: "Apple (Cooked/Mashed)",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
        tags: ["easy_digest", "pectin"]
    },
    {
        id: "pear",
        name: "Pear",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 57, protein: 0.4, carbs: 15, fat: 0.1 },
        tags: ["easy_digest", "fiber"]
    },
    {
        id: "banana",
        name: "Banana",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
        tags: ["easy_digest", "potassium"]
    },
    {
        id: "plum",
        name: "Plum",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 46, protein: 0.7, carbs: 11, fat: 0.3 },
        tags: ["easy_digest"]
    },
    {
        id: "apricot",
        name: "Apricot",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 48, protein: 1.4, carbs: 11, fat: 0.4 },
        tags: ["beta_carotene", "vitamin_c"]
    },
    {
        id: "peach",
        name: "Peach",
        category: "fruit",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3 },
        tags: ["vitamin_c"]
    },

    // ==========================================
    // VEGETABLES (Savory & Sweet)
    // ==========================================
    {
        id: "potato",
        name: "Potato (Cooked)",
        category: "vegetable",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
        tags: ["easy_digest"]
    },
    {
        id: "carrot",
        name: "Carrot (Cooked)",
        category: "vegetable",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 35, protein: 0.8, carbs: 8, fat: 0.2 },
        tags: ["beta_carotene"]
    },
    {
        id: "parsnip",
        name: "Parsnip (Cooked)",
        category: "vegetable",
        flavor: "sweet", // Parsnips are naturally quite sweet
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 75, protein: 1.2, carbs: 18, fat: 0.3 },
        tags: ["fiber"]
    },
    {
        id: "beetroot",
        name: "Beetroot (Cooked)",
        category: "vegetable",
        flavor: "sweet", // Earthy but sweet
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 43, protein: 1.6, carbs: 10, fat: 0.2 },
        tags: ["antioxidants"]
    },
    {
        id: "broccoli",
        name: "Broccoli (Steamed)",
        category: "vegetable",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4 },
        tags: ["vitamin_c", "calcium"]
    },
    {
        id: "cauliflower",
        name: "Cauliflower (Steamed)",
        category: "vegetable",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
        tags: ["vitamin_c"]
    },
    {
        id: "zucchini",
        name: "Zucchini",
        category: "vegetable",
        flavor: "savory",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
        tags: ["easy_digest"]
    },
    {
        id: "sweet_potato",
        name: "Sweet Potato",
        category: "vegetable",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
        tags: ["beta_carotene", "easy_digest"]
    },
    {
        id: "butternut_squash",
        name: "Butternut Squash",
        category: "vegetable",
        flavor: "sweet",
        babySafeFromMonths: 6,
        macrosPer100g: { calories: 45, protein: 1, carbs: 12, fat: 0.1 },
        tags: ["beta_carotene", "easy_digest"]
    }
];

export const EXTENSIVE_TEMPLATES: MealTemplate[] = [
    // ==========================================
    // BREAKFAST (Strictly Savory)
    // ==========================================
    {
        id: "bfast_polenta_veal",
        slot: "breakfast",
        flavorProfile: "savory",
        title: "Veal & Veggie Polenta",
        requirements: [
            { grams: 50, category: "grain" }, // Polenta/Rice
            { grams: 30, category: "protein" }, // Veal/Chicken/Turkey
            { grams: 30, category: "vegetable", flavor: "savory" }, // Zucchini/Cauliflower
            { grams: 5, category: "fat" } // Olive oil
        ]
    },
    {
        id: "bfast_egg_millet",
        slot: "breakfast",
        flavorProfile: "savory",
        title: "Egg & Veggie Millet",
        requirements: [
            { grams: 40, category: "grain" }, // Millet/Rice
            { grams: 50, category: "protein", anyOfTags: ["choline"] }, // Egg
            { grams: 40, category: "vegetable", flavor: "savory" }, // Broccoli/Zucchini
            { grams: 20, category: "fat", anyOfTags: ["healthy_fat"] } // Avocado
        ]
    },
    {
        id: "bfast_chicken_rice",
        slot: "breakfast",
        flavorProfile: "savory",
        title: "Chicken & Root Veggie Bowl",
        requirements: [
            { grams: 50, category: "grain" }, // Rice
            { grams: 40, category: "protein" }, // Chicken
            { grams: 40, category: "vegetable", flavor: "savory" }, // Potato
            { grams: 5, category: "fat" } // Olive oil
        ]
    },
    {
        id: "bfast_turkey_puree",
        slot: "breakfast",
        flavorProfile: "savory",
        title: "Turkey & Broccoli Mash",
        requirements: [
            { grams: 40, category: "protein" }, // Turkey
            { grams: 50, category: "vegetable", flavor: "savory", anyOfTags: ["vitamin_c"] }, // Broccoli/Cauliflower
            { grams: 30, category: "grain" }, // Rice semolina
            { grams: 20, category: "fat" } // Avocado/Oil
        ]
    },

    // ==========================================
    // LUNCH (Strictly Savory)
    // ==========================================
    {
        id: "lunch_iron_veal",
        slot: "lunch",
        flavorProfile: "savory",
        title: "Iron-Rich Veal & Veggies",
        requirements: [
            { grams: 40, category: "protein", anyOfTags: ["heme_iron"] }, // Veal
            { grams: 40, category: "vegetable", flavor: "savory", anyOfTags: ["vitamin_c"] }, // Broccoli
            { grams: 50, category: "vegetable", flavor: "savory" }, // Potato/Zucchini
            { grams: 5, category: "fat" } // Olive oil
        ]
    },
    {
        id: "lunch_chicken_stew",
        slot: "lunch",
        flavorProfile: "savory",
        title: "Chicken & Potato Stew",
        requirements: [
            { grams: 40, category: "protein" }, // Chicken
            { grams: 50, category: "vegetable", flavor: "savory" }, // Potato
            { grams: 30, category: "grain" }, // Millet/Rice
            { grams: 5, category: "fat" } // Olive Oil
        ]
    },
    {
        id: "lunch_egg_bowl",
        slot: "lunch",
        flavorProfile: "savory",
        title: "Nourishing Egg & Greens",
        requirements: [
            { grams: 50, category: "protein", anyOfTags: ["choline"] }, // Egg
            { grams: 40, category: "vegetable", flavor: "savory" }, // Zucchini
            { grams: 40, category: "grain" }, // Polenta
            { grams: 20, category: "fat" } // Avocado
        ]
    },
    {
        id: "lunch_turkey_mash",
        slot: "lunch",
        flavorProfile: "savory",
        title: "Turkey & Cauliflower Mash",
        requirements: [
            { grams: 40, category: "protein" }, // Turkey
            { grams: 50, category: "vegetable", flavor: "savory" }, // Cauliflower
            { grams: 40, category: "grain" }, // Rice
            { grams: 5, category: "fat" } // Olive oil
        ]
    },

    // ==========================================
    // DINNER (Strictly Sweet)
    // ==========================================
    {
        id: "dinner_fruit_oats",
        slot: "dinner",
        flavorProfile: "sweet",
        title: "Fruity Bedtime Oatmeal",
        requirements: [
            { grams: 60, category: "grain" }, // Oats / Rice semolina
            { grams: 40, category: "fruit", flavor: "sweet" }, // Banana/Apple
            { grams: 20, category: "fat" } // Avocado
        ]
    },
    {
        id: "dinner_sweet_potato",
        slot: "dinner",
        flavorProfile: "sweet",
        title: "Sweet Potato & Fruit Mash",
        requirements: [
            { grams: 60, category: "vegetable", flavor: "sweet" }, // Sweet Potato/Butternut
            { grams: 40, category: "fruit", flavor: "sweet" }, // Pear/Peach
            { grams: 5, category: "fat" } // Olive oil
        ]
    },
    {
        id: "dinner_rice_cereal",
        slot: "dinner",
        flavorProfile: "sweet",
        title: "Rice Cereal & Apricot",
        requirements: [
            { grams: 50, category: "grain" }, // Rice semolina
            { grams: 40, category: "fruit", flavor: "sweet", anyOfTags: ["beta_carotene", "vitamin_c"] }, // Apricot / Peach
            { grams: 40, category: "vegetable", flavor: "sweet" } // Carrot/Parsnip
        ]
    },
    {
        id: "dinner_millet_plum",
        slot: "dinner",
        flavorProfile: "sweet",
        title: "Millet & Plum Bowl",
        requirements: [
            { grams: 60, category: "grain" }, // Millet
            { grams: 40, category: "fruit", flavor: "sweet" }, // Plum
            { grams: 40, category: "vegetable", flavor: "sweet" } // Beetroot / Sweet Potato
        ]
    }
];
