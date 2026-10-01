import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { copy } from "@/content/copy";

export const alt = copy.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK =
  "M10 32Q10 12 30 12H252A243 234 0 0 1 252 480H30Q10 480 10 460ZM92 88H252C338 88 404 146 411 220C352 222 304 198 252 198C200 198 150 222 92 222ZM92 266C168 268 226 326 228 410H92ZM270 410C272 326 330 270 411 266C405 345 345 405 270 410ZM248 262m-36 0a36 36 0 1 0 72 0a36 36 0 1 0 -72 0Z";
const ROUTE = "M640 600L700 520L752 540L820 440L880 460L930 360L900 320L990 240L1050 262L1120 150L1100 110L1230 10";

export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), "assets/fonts/archivo-expanded-800.ttf"));
  const lines = copy.meta.ogText.split(/(?<=\.)\s+/);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0C0D0F",
          fontFamily: "Archivo",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <path d={ROUTE} fill="none" stroke="#FF8A1F" strokeOpacity="0.1" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <path d={ROUTE} fill="none" stroke="#FF8A1F" strokeOpacity="0.2" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <path d={ROUTE} fill="none" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", width: "100%" }}>
          <svg width="64" height="62" viewBox="0 0 505 493">
            <path d={MARK} fill="#FF6A00" fillRule="evenodd" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 56, color: "#F3F1EC", fontSize: 84, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "auto", color: "#8C9097", fontSize: 28, letterSpacing: "0.02em" }}>
            {copy.brand.domain}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 800, style: "normal" }] },
  );
}
