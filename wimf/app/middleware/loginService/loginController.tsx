import type { Route } from "../../routes/+types/home";
import { redirect } from "react-router";
import { validateLoginCredentials } from "./loginValidator";
import { createUserSession, getUserId } from "~/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return {};
}

export async function handleLogin({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("Login attempt for:", username);

  const validation = validateLoginCredentials(username, password);
  console.log("Validation result:", validation.user.user_id);

  if (!validation.isValid) {
    return { error: validation.error };
  }

  console.log("Login successful for:", username);
  const sessionResponse = await createUserSession(validation.user.user_id, "/dashboard");
  console.log("Session created, redirecting...", sessionResponse);
  return sessionResponse;
}