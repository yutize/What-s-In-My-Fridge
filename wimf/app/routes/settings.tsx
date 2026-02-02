import type { Route } from "./+types/settings";
import { Settings } from "~/pages/settings/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - What's In My Fridge" },
    { name: "description", content: "Manage your preferences and account settings" },
  ];
}

export default function SettingsRoute() {
  return <Settings />;
}
