// Shared by server (layout) and client (track, provider). No "use client" here,
// so the server reads real values rather than client references.
const isProd = process.env.NODE_ENV === "production";

export const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
export const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const posthogEnabled = isProd && posthogKey.length > 0;
export const metaEnabled = isProd && /^\d+$/.test(metaPixelId);
