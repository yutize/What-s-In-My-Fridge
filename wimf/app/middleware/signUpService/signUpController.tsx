import type { Route } from "../../routes/+types/home";
import { redirect } from "react-router";
import { db } from "../../db/app";
import { validateSignUpInfo } from "../../middleware/signUpService/infoValidation";
import bcrypt from "bcryptjs";

export async function handleSignUp({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(formData);
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const confirmationPassword = formData.get("confirmationPassword") as string;
  const email = formData.get("email") as string;
  const confirmationEmail = formData.get("confirmationEmail") as string;


  const validationResult = await validateSignUpInfo(username, firstName, lastName, password, confirmationPassword, email, confirmationEmail);
  if ("error" in validationResult) {
    return { error: validationResult.error };
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log("password before", password);
  console.log("Inserting user with hashed password:", hash );
  db.prepare("INSERT INTO Users (username, firstName, lastName, password, email) VALUES (?, ?, ?, ?, ?)")
    .run(username, firstName, lastName, hash, email);

  return redirect("/");
}