import assert from "node:assert/strict";
import { test } from "node:test";
import { openGraphBase, pageMeta, shareImage, twitterBase } from "../lib/seo";

test("pageMeta keeps the share image, site name and locale on subpages", () => {
  const m = pageMeta("About", "From software engineering in Istanbul to AI engineering in Washington, DC.", "/about");
  const og = m.openGraph as Record<string, unknown>;
  const tw = m.twitter as Record<string, unknown>;
  assert.deepEqual(og.images, [shareImage]);
  assert.equal(og.siteName, openGraphBase.siteName);
  assert.equal(og.locale, "en_US");
  assert.equal(og.url, "/about");
  assert.deepEqual(tw.images, [shareImage]);
  assert.equal(tw.card, twitterBase.card);
});

test("canonical and og:url agree", () => {
  const m = pageMeta("Work", "Case studies.", "/work/careergenai");
  assert.equal((m.alternates as { canonical: string }).canonical, "/work/careergenai");
  assert.equal((m.openGraph as { url: string }).url, "/work/careergenai");
});

test("share image matches the generated 1200x630 image", () => {
  assert.equal(shareImage.width, 1200);
  assert.equal(shareImage.height, 630);
  assert.ok(shareImage.url.startsWith("/"));
});
