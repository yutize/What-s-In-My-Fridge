import type { Route } from "./+types/logout";
import { logout } from "~/session.server";
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export async function action({ request }: Route.ActionArgs) {
    console.log(`logging out user...`);
  return logout(request);
}

export async function loader({ request }: Route.LoaderArgs) {
    console.log(`logging out user...2`);
  return logout(request);
}