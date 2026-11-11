/**
 * Builds a single-file static preview of the site from the SAME components
 * used by the Next.js app. next/link and next/navigation are swapped for
 * hash-routing shims so the preview can run as one HTML file.
 *
 *   node scripts/preview/build.mjs   ->  preview-dist/index.html
 */
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const out = resolve(root, "preview-dist");
mkdirSync(out, { recursive: true });

const nodePaths = (process.env.PREVIEW_NODE_PATH || "").split(":").filter(Boolean);
const common = {
  bundle: true,
  absWorkingDir: root,
  jsx: "automatic",
  nodePaths,
  alias: {
    "next/link": resolve(root, "scripts/preview/shims/link.tsx"),
    "next/navigation": resolve(root, "scripts/preview/shims/navigation.ts"),
    "next/image": resolve(root, "scripts/preview/shims/image.tsx"),
    "@": root,
  },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
};

await build({ ...common, entryPoints: ["scripts/preview/server.tsx"], platform: "node", format: "cjs", outfile: resolve(out, "server.cjs") });
await build({ ...common, entryPoints: ["scripts/preview/client.tsx"], platform: "browser", format: "iife", minify: true, target: "es2020", outfile: resolve(out, "client.js") });

const { render } = createRequire(import.meta.url)(resolve(out, "server.cjs"));
const markup = render();
const css = readFileSync(resolve(root, "app/globals.css"), "utf8");
const js = readFileSync(resolve(out, "client.js"), "utf8").replace(/<\/script/gi, "<\\/script");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F6F7F9">
<title>Kutay Deniz Yazicioglu · AI Engineering &amp; Data Science</title>
<meta name="description" content="Portfolio preview: AI engineering, data science, and cloud software.">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(readFileSync(resolve(root, "app/icon.svg"), "utf8"))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap">
<style>${css}</style>
</head>
<body>
<div id="root">${markup}</div>
<script>${js}</script>
</body>
</html>`;
writeFileSync(resolve(out, "index.html"), html);
console.log(`preview-dist/index.html  ${(html.length / 1024).toFixed(0)} KB`);
