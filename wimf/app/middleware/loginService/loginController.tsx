import type { Route } from "../../routes/+types/home";
import { redirect } from "react-router";
import { validateLoginCredentials } from "./loginValidator";


export async function handleLogin({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("Login attempt for:", username);

  const validation = validateLoginCredentials(username, password);

  if (!validation.isValid) {
    return { error: validation.error };
  }

  console.log("Login successful for:", username);

  return redirect("/dashboard");
}