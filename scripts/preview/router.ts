/** Preview-only hash router: maps Next.js paths to artifact-safe #names. */
type Listener = () => void;
const listeners = new Set<Listener>();
const ROUTES = ["home", "work", "research", "about", "resume", "contact", "not-found"];
const ANCHORS: Record<string, string> = { "selected-work": "home" };
export const SLUGS = ["careergenai", "becayis", "robotic-receptionist"];
SLUGS.forEach((s) => ROUTES.push(`work-${s}`));

let current = "home";

export function toHash(href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const [pathPart, anchor] = href.split("#");
  const [path] = pathPart.split("?");
  if (anchor) return `#${anchor}`;
  if (path === "/" || path === "") return "#home";
  return `#${path.replace(/^\//, "").replace(/\//g, "-")}`;
}

export function routeToPath(route: string) {
  if (route === "home") return "/";
  if (route.startsWith("work-")) return `/work/${route.slice(5)}`;
  return `/${route}`;
}

function resolve(hash: string): string {
  const h = hash.replace(/^#/, "");
  if (!h) return "home";
  if (ROUTES.includes(h)) return h;
  if (ANCHORS[h]) return ANCHORS[h];
  if (h === "main") return current;
  return "not-found";
}

export function getRoute() {
  return current;
}
export function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}
export function startRouter() {
  const update = () => {
    const next = resolve(location.hash);
    const changed = next !== current;
    current = next;
    listeners.forEach((l) => l());
    const h = location.hash.replace(/^#/, "");
    if (changed && !ANCHORS[h] && h !== "main") {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
    } else if (ANCHORS[h]) {
      requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView());
    }
  };
  current = resolve(location.hash);
  window.addEventListener("hashchange", update);
}
