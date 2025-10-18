import type { Route } from "../../routes/+types/home";
import { redirect } from "react-router";
import { db } from "../../db/app";

export async function handleLogin({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(formData);

  // Query the database for the user
  const user = db.prepare("SELECT * FROM Users WHERE email = ?").get(email);

  if (!user) {
    // User not found
    return { error: "Invalid email or password" };
  }

  // TODO: Verify password hash (for now, just a placeholder)
  // You'll need to implement proper password hashing with bcrypt
  // const isValidPassword = await bcrypt.compare(password, user.password_hash);
  
  // TODO: Set up session/cookie here
  // For example, using cookies:
  // const session = await createSession(user.user_id);
  // return redirect("/dashboard", {
  //   headers: { "Set-Cookie": await commitSession(session) }
  // });

  // For now, redirect to a dashboard or inventory page
  console.log("Login successful for:", email);
  return redirect("/dashboard");
}