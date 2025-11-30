import type { Route } from "./+types/dashboard";
import { Dashboard } from "../pages/dashboard/dashboard";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "dashboard", content: "Main page for managing your fridge." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const user = db.prepare(`SELECT firstName FROM Users WHERE user_id = ?`).get(await getUserId(request));
  return { user };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <Dashboard user={loaderData.user.firstName} />;
}