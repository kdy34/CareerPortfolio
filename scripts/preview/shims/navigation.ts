import { useSyncExternalStore } from "react";
import { getRoute, routeToPath, subscribe } from "../router";

export function usePathname() {
  const route = useSyncExternalStore(subscribe, getRoute, () => "home");
  return routeToPath(route);
}
export function notFound(): never {
  throw new Error("notFound");
}
