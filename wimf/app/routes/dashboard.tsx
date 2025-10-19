import type { Route } from "./+types/home";
import { Dashboard } from "../pages/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Learn more about us." },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
