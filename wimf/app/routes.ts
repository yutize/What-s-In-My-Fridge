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
    route("ingredients", "routes/ingredients.tsx"),
] satisfies RouteConfig;
