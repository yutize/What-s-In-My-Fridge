import { GoogleGenAI } from "@google/genai";

export interface RecipePick {
  name: string;
  description: string;
  tag: string;       // e.g. "High Protein", "Fresh", "Classic"
  tagColor: "primary" | "secondary" | "tertiary";
  cookTime: string;  // e.g. "20m"
  difficulty: string; // e.g. "Easy", "Medium", "Quick"
  image?: string;    // Edamam image URL, filled in later
  url?: string;      // Edamam recipe URL, filled in later
}

export interface RecipePicksResult {
  featured: RecipePick;
  picks: RecipePick[]; // exactly 2 additional picks
}

/**
 * Ask Gemini to suggest 3 recipes based on the user's fridge inventory.
 * Returns structured recipe metadata; Edamam images are fetched separately.
 */
export async function getAIRecipePicks(
  ingredients: string[],
  nutritionProfile?: { caloriesLow?: number; caloriesHigh?: number; protein?: number } | null,
  randomize = false
): Promise<RecipePicksResult> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const ingredientList = ingredients.length > 0
    ? ingredients.slice(0, 20).join(", ")
    : "common pantry staples (eggs, pasta, olive oil, garlic, onion)";

  const nutritionHint = nutritionProfile?.caloriesLow
    ? `Target per-meal: ${nutritionProfile.caloriesLow}–${nutritionProfile.caloriesHigh} kcal, ${nutritionProfile.protein}g protein.`
    : "";

  const randomInstruction = randomize
    ? "Be creative and pick an unexpected or exotic recipe as the featured pick."
    : "Pick recipes that are practical for everyday cooking.";

  const prompt = `You are a culinary AI for "What's In My Fridge". 
Given these fridge ingredients: ${ingredientList}
${nutritionHint}
${randomInstruction}

Suggest exactly 3 recipes. Return ONLY valid JSON matching this exact structure, no markdown, no explanation:
{
  "featured": {
    "name": "Recipe Name",
    "description": "One-line description under 15 words.",
    "tag": "High Protein",
    "tagColor": "primary",
    "cookTime": "20m",
    "difficulty": "Easy"
  },
  "picks": [
    {
      "name": "Recipe Name",
      "description": "One-line description under 12 words.",
      "tag": "Classic",
      "tagColor": "secondary",
      "cookTime": "15m",
      "difficulty": "Easy"
    },
    {
      "name": "Recipe Name",
      "description": "One-line description under 12 words.",
      "tag": "Fresh",
      "tagColor": "tertiary",
      "cookTime": "10m",
      "difficulty": "Quick"
    }
  ]
}

Rules:
- tagColor must be one of: "primary", "secondary", "tertiary"
- tag should describe the recipe style or nutrition angle (e.g. "High Protein", "Fresh", "Classic", "Comfort", "Quick", "Vegan", "Keto")
- cookTime format: "15m" or "1h 20m"
- difficulty: "Easy", "Medium", "Quick", or "Advanced"
- Recipes should be feasible with the listed ingredients (allow some pantry basics)`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  // Strip any markdown fences if present
  const jsonText = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

  try {
    const parsed = JSON.parse(jsonText) as RecipePicksResult;
    return parsed;
  } catch {
    // Fallback if Gemini returns bad JSON
    return {
      featured: {
        name: "Chef's Surprise",
        description: "A delicious dish crafted from your ingredients.",
        tag: "Editor's Choice",
        tagColor: "primary",
        cookTime: "30m",
        difficulty: "Easy",
      },
      picks: [
        {
          name: "Quick Stir Fry",
          description: "Fast and flavorful with what you have.",
          tag: "Quick",
          tagColor: "secondary",
          cookTime: "15m",
          difficulty: "Easy",
        },
        {
          name: "Garden Salad Bowl",
          description: "Fresh vegetables with a light dressing.",
          tag: "Fresh",
          tagColor: "tertiary",
          cookTime: "10m",
          difficulty: "Quick",
        },
      ],
    };
  }
}

/**
 * Fetch a recipe image + detail URL from Edamam for a given recipe name.
 * Returns null if Edamam is not configured or no results found.
 */
export async function fetchEdamamRecipeDetail(
  recipeName: string
): Promise<{ image: string; url: string } | null> {
  const APP_ID = (process.env.APP_ID ?? "").trim();
  const APP_KEY = (process.env.API_KEY ?? "").trim();

  if (!APP_ID || !APP_KEY) return null;

  try {
    const params = new URLSearchParams({
      type: "public",
      q: recipeName,
      app_id: APP_ID,
      app_key: APP_KEY,
    });

    const res = await fetch(`https://api.edamam.com/api/recipes/v2?${params}`);
    if (!res.ok) return null;

    const data = (await res.json()) as { hits: Array<{ recipe: { label: string; image: string; url: string } }> };
    const hit = data.hits?.[0]?.recipe;
    if (!hit) return null;

    return { image: hit.image, url: hit.url };
  } catch {
    return null;
  }
}
