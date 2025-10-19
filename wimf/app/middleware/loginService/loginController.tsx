import type { Route } from "../../routes/+types/home";
import { redirect } from "react-router";
import { db } from "../../db/app";
import bcrypt, { hash } from "bcryptjs";

export async function handleLogin({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("Login attempt for:", username);

  const user = db.prepare("SELECT * FROM Users WHERE username = ?").get(username) as any;

  if (!user) {
    return { error: "Invalid username or password" };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    console.log("Invalid password for user:", username);
    return { error: "Invalid username or password" };
  }

  console.log("Login successful for:", username);
  return redirect("/dashboard");
}