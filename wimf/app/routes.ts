import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("signup", "routes/signUp.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("ingredients", "routes/ingredients.tsx"),
    route("logout", "routes/logout.tsx"),
    route("recipes", "routes/recipes.tsx"),
    route("nutrition", "routes/nutrition.tsx"),
    route("settings", "routes/settings.tsx"),
    route("savedRecipes", "routes/savedRecipes.tsx"),
    route("api/nutrition-chat", "routes/nutritionChat.tsx"),
] satisfies RouteConfig;
