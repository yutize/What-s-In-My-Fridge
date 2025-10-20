import { SignUp } from "~/pages/signUpPage/signUp";
import type { Route } from "./+types/signUp";
import { handleSignUp } from "~/middleware/signUpService/signUpController";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - What's In My Fridge" },
    { name: "description", content: "Create an account to manage your fridge inventory" },
  ];
}

export async function action(args: Route.ActionArgs) {
  return handleSignUp(args);
}

export default function signUp() {
  return <SignUp />;
}
