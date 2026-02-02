import bcrypt from "bcryptjs";
import { findUserByUsername } from "./loginService";

export interface LoginValidationResult {
  isValid: boolean;
  error?: string;
  user?: any;
}


export function validateLoginCredentials(
  username: string,
  password: string
): LoginValidationResult {
  if (!username || !password) {
    return {
      isValid: false,
      error: "Username and password are required",
    };
  }

  const user = findUserByUsername(username);

  if (!user) {
    return {
      isValid: false,
      error: "Invalid username or password",
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    console.log("Invalid password for user:", username);
    return {
      isValid: false,
      error: "Invalid username or password",
    };
  }

  return {
    isValid: true,
    user,
  };
}
