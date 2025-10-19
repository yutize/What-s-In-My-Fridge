import { db } from "../../db/app";

export interface User {
  user_id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  created_at: string;
}

export function findUserByUsername(username: string): User | undefined {
  return db
    .prepare("SELECT * FROM Users WHERE username = ?")
    .get(username) as User | undefined;
}

export function findUserByEmail(email: string): User | undefined {
  return db
    .prepare("SELECT * FROM Users WHERE email = ?")
    .get(email) as User | undefined;
}
