import { db } from "../../db/app";

export async function  validateSignUpInfo(username: string, firstName: string, lastName: string, password: string, confirmationPassword: string, email: string, confirmationEmail: string) {
    const doesEmailMatch = email === confirmationEmail;
    const doesPasswordMatch = password === confirmationPassword;

    if (!doesEmailMatch) {
        return { error: "Email addresses do not match" };
    }

    if (!doesPasswordMatch) {
        return { error: "Passwords do not match" };
    }

    const existingUser = db.prepare("SELECT * FROM Users WHERE email = ?").get(email);
    if (existingUser) {
        return { error: "Email is already in use" };
    }

    return { success: true };
}