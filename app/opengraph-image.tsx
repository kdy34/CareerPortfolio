import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const alt = `${profile.name}, AI Engineering and Data Science`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F6F7F9", color: "#0F1E36", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#0B5CAD", letterSpacing: 2 }}>AI ENGINEERING · DATA SCIENCE · CLOUD COMPUTING · WASHINGTON, DC AREA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, color: "#4A5568" }}>{profile.name}</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 16 }}>From raw data to working AI systems.</div>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ width: 120, height: 4, background: "#0B5CAD" }} />
          <div style={{ width: 60, height: 4, background: "#5A4AB5" }} />
          <div style={{ width: 30, height: 4, background: "#A26A12" }} />
        </div>
      </div>
    ),
    size,
  );
}
