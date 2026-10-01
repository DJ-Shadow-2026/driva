// Generates app/icon.png and app/apple-icon.png from public/brand/driva-mark.png.
// Run with: node scripts/generate-icons.mjs
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const SRC = "public/brand/driva-mark.png";
// The mark's own background, so the padding is seamless.
const BG = { r: 17, g: 19, b: 23, alpha: 1 };

async function make(size, padding, out) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(SRC).resize(inner, inner, { fit: "contain", background: BG }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("wrote", out);
}

await make(512, 0.14, "app/icon.png");
await make(180, 0.16, "app/apple-icon.png");
