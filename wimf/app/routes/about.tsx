import type { Route } from "./+types/home";
import { About } from "../pages/about/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "about", content: "Learn more about us." },
  ];
}

export default function AboutRoute() {
  return <About />;
}
