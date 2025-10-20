import type { Route } from "./+types/dashboard";
import { Dashboard } from "../pages/dashboard/dashboard";
import { requireUserId } from "~/session.server";
import { db } from "~/db/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "dashboard", content: "Main page for managing your fridge." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  console.log("🔍 Dashboard loader running...");
  
  const userId = await requireUserId(request);
  console.log("👤 User ID from session:", userId);
  
  const user = db.prepare("SELECT firstName, lastName FROM users WHERE user_id = ?").get(userId) as any;
  console.log("📊 User from database:", user);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  return { firstName: user.firstName };
}

export default function DashboardRoute() {
  return <Dashboard />;
}