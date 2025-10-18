import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";
import { handleLogin } from "../middleware/loginService/loginController";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - What's In My Fridge" },
    { name: "description", content: "Sign in to manage your fridge inventory" },
  ];
}

export async function action(args: Route.ActionArgs) {
  return handleLogin(args);
}

export default function Home() {
  return <Welcome />;
}
