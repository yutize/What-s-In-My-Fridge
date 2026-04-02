import { GoogleGenAI, Type, type Content, type FunctionDeclaration } from "@google/genai";

// ─── Tool declarations (functions the AI can invoke) ───────────────────────

const nutritionTools: FunctionDeclaration[] = [
  {
    name: "calculateAndApplyMealPlan",
    description:
      "Calculate a personalized daily calorie target and macro split from the user's body stats and goal, then immediately apply it to their nutrition profile. Call this once you have collected height, weight, age, gender, activity level, and goal.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        heightCm: {
          type: Type.NUMBER,
          description: "User's height in centimetres (e.g. 175). Convert from feet/inches if needed.",
        },
        weightKg: {
          type: Type.NUMBER,
          description: "User's weight in kilograms (e.g. 80). Convert from lbs if needed.",
        },
        age: {
          type: Type.NUMBER,
          description: "User's age in years.",
        },
        gender: {
          type: Type.STRING,
          description: "User's gender: 'male' or 'female'.",
        },
        activityLevel: {
          type: Type.STRING,
          description:
            "One of: 'sedentary' (little/no exercise), 'light' (1-3 days/week), 'moderate' (3-5 days/week), 'active' (6-7 days/week), 'very_active' (hard daily exercise or physical job).",
        },
        goal: {
          type: Type.STRING,
          description:
            "One of: 'weight_loss' (lose fat), 'maintenance' (maintain weight), 'muscle_gain' (build muscle), 'recomp' (lose fat and gain muscle simultaneously).",
        },
        profileName: {
          type: Type.STRING,
          description: "A descriptive name for this profile, e.g. 'Weight Loss Plan', 'Muscle Gain 2026'.",
        },
        dietStyle: {
          type: Type.STRING,
          description:
            "Optional preferred diet style: 'balanced', 'keto', 'low_carb', 'high_protein', 'vegan', 'paleo'. Defaults to 'balanced'.",
        },
      },
      required: ["heightCm", "weightKg", "age", "gender", "activityLevel", "goal", "profileName"],
    },
  },
  {
    name: "updateProfileName",
    description: "Set the user's nutrition profile name",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The profile name, e.g. 'Weight Loss Plan', 'Keto Plan', 'Muscle Gain'",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "updateCalories",
    description: "Set the user's desired calorie range (min and max PER MEAL). If the user provides a daily range, divide it by 3.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        min: { type: Type.NUMBER, description: "Minimum PER MEAL calories (kcal)" },
        max: { type: Type.NUMBER, description: "Maximum PER MEAL calories (kcal)" },
      },
      required: ["min", "max"],
    },
  },
  {
    name: "updateMacros",
    description: "Set the user's PER MEAL macro goals for protein, carbohydrates, and fat. If the user gives daily totals, divide them by 3 before calling.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.NUMBER, description: "PER MEAL protein goal in grams" },
        carbs: { type: Type.NUMBER, description: "PER MEAL carbohydrates goal in grams" },
        fat: { type: Type.NUMBER, description: "PER MEAL fat goal in grams" },
      },
      required: ["protein", "carbs", "fat"],
    },
  },
  {
    name: "updateAllergies",
    description:
      "Set the user's food allergies. Valid values: nuts, dairy, eggs, shellfish, fish, soy, gluten, sesame, peanuts",
    parameters: {
      type: Type.OBJECT,
      properties: {
        allergies: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of allergy values from: nuts, dairy, eggs, shellfish, fish, soy, gluten, sesame, peanuts",
        },
      },
      required: ["allergies"],
    },
  },
  {
    name: "updateDietaryPreferences",
    description:
      "Set the user's dietary preferences. Valid values: vegetarian, vegan, pescatarian, keto, paleo, Mediterranean, kosher, pork-free, red-meat-free",
    parameters: {
      type: Type.OBJECT,
      properties: {
        preferences: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description:
            "List of preference values from: vegetarian, vegan, pescatarian, keto, paleo, Mediterranean, kosher, pork-free, red-meat-free",
        },
      },
      required: ["preferences"],
    },
  },
  {
    name: "updateFullProfile",
    description:
      "Update multiple profile fields at once without body stats. Always calculate macros PER MEAL (divide daily totals by 3).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        profileName: { type: Type.STRING, description: "Profile name" },
        caloriesMin: { type: Type.NUMBER, description: "Minimum PER MEAL calories" },
        caloriesMax: { type: Type.NUMBER, description: "Maximum PER MEAL calories" },
        protein: { type: Type.NUMBER, description: "Protein in grams (PER MEAL)" },
        carbs: { type: Type.NUMBER, description: "Carbohydrates in grams (PER MEAL)" },
        fat: { type: Type.NUMBER, description: "Fat in grams (PER MEAL)" },
        allergies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of allergy values" },
        preferences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of dietary preference values" },
      },
      required: [],
    },
  },
];

// ─── System Instruction ───────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are an expert AI Nutrition Assistant embedded in a meal planning app called "What's In My Fridge".
Your job is to help users build a personalized nutrition profile through friendly, conversational interaction.

━━━ ONBOARDING (FIRST MESSAGE) ━━━
When the conversation history is empty (this is the user's first message), ALWAYS start with a warm, personal greeting and ask for their body stats and goals. Exact formatting should be exactly as follows, paying attention to the newlines and bullet points:

"Hi! 👋 I'm your AI Nutrition Assistant.

To build you a personalized meal plan, I'd love to learn a bit about you! Could you share:
  • Your **height** and **weight**
  • Your **age** and **gender**
  • Your **activity level** (sedentary / lightly active / moderately active / very active)
  • Your **primary goal** (lose weight, maintain, build muscle, or body recomp)
  • Any **allergies** or **dietary preferences** you have (e.g. vegetarian, vegan, paleo, keto, dairy-free, nut-free, etc.)

Feel free to share as much or as little as you're comfortable with — you can also skip this and just tell me what macros you want! 😊"

Once you have all four pieces of info (height, weight, age+gender optional, activity, goal), call calculateAndApplyMealPlan immediately.

━━━ PERSONALIZED CALCULATION ━━━
When the user provides body stats, call calculateAndApplyMealPlan which will:
- Calculate their TDEE (total daily energy expenditure) using the Mifflin-St Jeor equation
- Apply a calorie adjustment for their goal (deficit for loss, surplus for gain)
- Split macros appropriately for their goal and diet style
- Set the profile name based on their goal

After the function runs, explain the results in plain language:
- Their estimated total daily energy expenditure (TDEE)
- Emphasize that the new calorie ranges and macros in the form are calculated **PER MEAL** (based on 3 meals a day). Show them the per-meal calorie range and macros.
- 2–3 tips specific to their goal, along with helpful guidance regarding their requested dietary preferences or allergies.

━━━ GOAL GUIDELINES ━━━
- weight_loss: 400-500 kcal deficit, high protein (0.8-1g/lb bodyweight), moderate carbs, moderate fat
- maintenance: At TDEE, balanced macros (30% protein, 40% carbs, 30% fat)
- muscle_gain: 200-300 kcal surplus, very high protein (0.8-1g/lb), high carbs for fuel
- recomp: At TDEE, very high protein (1g/lb), moderate carbs, moderate fat

━━━ DIET STYLE MACRO SPLITS ━━━
- balanced: ~30% protein, ~40% carbs, ~30% fat
- keto: ~25% protein, ~5% carbs, ~70% fat (net carbs ~20-30g)
- low_carb: ~30% protein, ~20% carbs, ~50% fat
- high_protein: ~40% protein, ~35% carbs, ~25% fat
- vegan: ~25% protein, ~50% carbs, ~25% fat
- paleo: ~30% protein, ~35% carbs, ~35% fat

━━━ ONGOING CONVERSATION ━━━
- If the user asks to tweak specific values, use the individual update functions.
- If the user mentions allergies, call updateAllergies.
- If the user mentions dietary preferences, call updateDietaryPreferences.
- Be concise and friendly. After any update, confirm what changed and ask if there's anything else.
- Always respond in English only.
- Never show raw numbers without context — always explain what they mean and why.

━━━ CONVERSATION BOUNDARIES (VERY IMPORTANT) ━━━
- STRICT GUARDRAIL: You are strictly a Nutrition and Meal Planning assistant for the "What's In My Fridge" application.
- You MUST DECLINE to answer any questions or respond to prompts that are off-topic, general knowledge, programming, political, or unrelated to nutrition, macros, meal planning, or the application.
- If the user asks an off-topic query, politely but firmly respond with: "I'm sorry, but I can only answer questions and assist with tasks related to your nutrition profile and meal planning in this application."`;

// ─── TDEE Calculator (server-side, feeds into the function call handler) ────

interface MealPlanInput {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: string;
  activityLevel: string;
  goal: string;
  profileName: string;
  dietStyle?: string;
}

interface MealPlanResult {
  profileName: string;
  caloriesLow: number;
  caloriesHigh: number;
  protein: number;
  carbs: number;
  fat: number;
  preferences: string[];
  tdee: number;
}

function computeMealPlan(input: MealPlanInput): MealPlanResult {
  const { heightCm, weightKg, age, gender, activityLevel, goal, profileName, dietStyle = "balanced" } = input;

  // ── Step 1: BMR via Mifflin-St Jeor ────────────────────────────────────────
  let bmr: number;
  if (gender.toLowerCase() === "female") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  // ── Step 2: Activity multiplier ─────────────────────────────────────────────
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const multiplier = activityMultipliers[activityLevel.toLowerCase()] ?? 1.55;
  const tdee = Math.round(bmr * multiplier);

  // ── Step 3: Calorie adjustment for goal ─────────────────────────────────────
  const goalAdjustments: Record<string, number> = {
    weight_loss: -450,
    maintenance: 0,
    muscle_gain: +250,
    recomp: 0,
  };
  const adjustment = goalAdjustments[goal.toLowerCase()] ?? 0;
  const targetCalories = tdee + adjustment;
  const caloriesLow = targetCalories - 50;
  const caloriesHigh = targetCalories + 50;

  // ── Step 4: Macro split by diet style ───────────────────────────────────────
  const weightLbs = weightKg * 2.205;

  let protein: number;
  let carbs: number;
  let fat: number;

  switch (dietStyle.toLowerCase()) {
    case "keto":
      protein = Math.round(weightLbs * 0.7);
      carbs = 25; // net carbs
      fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
      break;
    case "low_carb":
      protein = Math.round(weightLbs * 0.8);
      carbs = Math.round((targetCalories * 0.2) / 4);
      fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
      break;
    case "high_protein":
      protein = Math.round(weightLbs * 1.0);
      carbs = Math.round((targetCalories * 0.35) / 4);
      fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
      break;
    case "vegan":
      protein = Math.round((targetCalories * 0.25) / 4);
      carbs = Math.round((targetCalories * 0.50) / 4);
      fat = Math.round((targetCalories * 0.25) / 9);
      break;
    case "paleo":
      protein = Math.round((targetCalories * 0.30) / 4);
      carbs = Math.round((targetCalories * 0.35) / 4);
      fat = Math.round((targetCalories * 0.35) / 9);
      break;
    default: // balanced
      switch (goal.toLowerCase()) {
        case "weight_loss":
          protein = Math.round(weightLbs * 0.85);
          carbs = Math.round((targetCalories * 0.35) / 4);
          fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
          break;
        case "muscle_gain":
          protein = Math.round(weightLbs * 0.9);
          carbs = Math.round((targetCalories * 0.45) / 4);
          fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
          break;
        case "recomp":
          protein = Math.round(weightLbs * 1.0);
          carbs = Math.round((targetCalories * 0.35) / 4);
          fat = Math.round((targetCalories - protein * 4 - carbs * 4) / 9);
          break;
        default: // maintenance / balanced
          protein = Math.round((targetCalories * 0.30) / 4);
          carbs = Math.round((targetCalories * 0.40) / 4);
          fat = Math.round((targetCalories * 0.30) / 9);
      }
  }

  // Clamp fat to at least 30g (minimum for hormone health)
  fat = Math.max(fat, 30);

  // ── Step 5: Dietary preferences for the profile ─────────────────────────────
  const preferences: string[] = [];
  if (dietStyle === "keto") preferences.push("keto");
  if (dietStyle === "paleo") preferences.push("paleo");
  if (dietStyle === "vegan") preferences.push("vegan");

  return {
    profileName,
    caloriesLow: Math.round(caloriesLow / 3),
    caloriesHigh: Math.round(caloriesHigh / 3),
    protein: Math.round(protein / 3),
    carbs: Math.round(carbs / 3),
    fat: Math.round(fat / 3),
    preferences,
    tdee,
  };
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface FormUpdates {
  profileName?: string;
  caloriesLow?: number;
  caloriesHigh?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  allergies?: string[];
  preferences?: string[];
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface ChatResponse {
  aiText: string;
  formUpdates: FormUpdates;
}

// ─── Gemini Agent ────────────────────────────────────────────────────────────

export async function sendNutritionChatMessage(
  userMessage: string,
  history: ChatMessage[],
  currentProfile?: Record<string, unknown>
): Promise<ChatResponse> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Get your key at https://aistudio.google.com/app/apikey and add it to wimf/.env"
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const geminiHistory: Content[] = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  let systemWithContext = SYSTEM_INSTRUCTION;
  if (currentProfile) {
    systemWithContext += `\n\nCurrent profile state:\n${JSON.stringify(currentProfile, null, 2)}`;
  }

  const chat = ai.chats.create({
    model: "gemini-3.1-flash-lite-preview",
    config: {
      systemInstruction: systemWithContext,
      tools: [{ functionDeclarations: nutritionTools }],
    },
    history: geminiHistory,
  });

  const formUpdates: FormUpdates = {};
  let aiText = "";

  const response = await chat.sendMessage({ message: userMessage });

  // ── Process response parts ─────────────────────────────────────────────────
  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.text) {
      aiText += part.text;
    }
    if (part.functionCall) {
      const { name, args } = part.functionCall;
      applyFunctionCall(name ?? "", (args as Record<string, unknown>) ?? {}, formUpdates);
    }
  }

  // ── If function calls were made but no text produced, get a confirmation ───
  if (Object.keys(formUpdates).length > 0 && !aiText) {
    const summaryCtx = formUpdates.caloriesLow
      ? `calories ${formUpdates.caloriesLow}–${formUpdates.caloriesHigh} kcal, protein ${formUpdates.protein}g, carbs ${formUpdates.carbs}g, fat ${formUpdates.fat}g`
      : JSON.stringify(formUpdates);
    const followUp = await chat.sendMessage({
      message: `Profile updated with: ${summaryCtx}. Briefly confirm in a friendly, encouraging way and mention 2–3 practical tips for their goal.`,
    });
    aiText = followUp.text ?? "✅ I've updated your nutrition profile!";
  }

  if (!aiText) {
    aiText = "I've updated your nutrition profile based on your request!";
  }

  return { aiText, formUpdates };
}

// ─── Function call handler ────────────────────────────────────────────────────

function applyFunctionCall(
  name: string,
  args: Record<string, unknown>,
  formUpdates: FormUpdates
): void {
  switch (name) {
    case "calculateAndApplyMealPlan": {
      const plan = computeMealPlan(args as unknown as MealPlanInput);
      formUpdates.profileName = plan.profileName;
      formUpdates.caloriesLow = plan.caloriesLow;
      formUpdates.caloriesHigh = plan.caloriesHigh;
      formUpdates.protein = plan.protein;
      formUpdates.carbs = plan.carbs;
      formUpdates.fat = plan.fat;
      if (plan.preferences.length > 0) formUpdates.preferences = plan.preferences;
      break;
    }
    case "updateProfileName":
      formUpdates.profileName = args.name as string;
      break;
    case "updateCalories":
      formUpdates.caloriesLow = args.min as number;
      formUpdates.caloriesHigh = args.max as number;
      break;
    case "updateMacros":
      formUpdates.protein = args.protein as number;
      formUpdates.carbs = args.carbs as number;
      formUpdates.fat = args.fat as number;
      break;
    case "updateAllergies":
      formUpdates.allergies = args.allergies as string[];
      break;
    case "updateDietaryPreferences":
      formUpdates.preferences = args.preferences as string[];
      break;
    case "updateFullProfile": {
      const a = args as {
        profileName?: string; caloriesMin?: number; caloriesMax?: number;
        protein?: number; carbs?: number; fat?: number;
        allergies?: string[]; preferences?: string[];
      };
      if (a.profileName !== undefined) formUpdates.profileName = a.profileName;
      if (a.caloriesMin !== undefined) formUpdates.caloriesLow = a.caloriesMin;
      if (a.caloriesMax !== undefined) formUpdates.caloriesHigh = a.caloriesMax;
      if (a.protein !== undefined) formUpdates.protein = a.protein;
      if (a.carbs !== undefined) formUpdates.carbs = a.carbs;
      if (a.fat !== undefined) formUpdates.fat = a.fat;
      if (a.allergies !== undefined) formUpdates.allergies = a.allergies;
      if (a.preferences !== undefined) formUpdates.preferences = a.preferences;
      break;
    }
  }
}
