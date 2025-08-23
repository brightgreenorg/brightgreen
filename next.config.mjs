// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // AVIF only; non-AVIF browsers will fall back to the original JPEG.
    formats: ["image/avif"],

    // Same responsive sizes as before.
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // NOTE (Aug 2025): TTL is intentionally short (1 hour) while brand/hero art
    // is still evolving. Revisit later: once assets stabilize, raise this value
    // (e.g., 31536000 = 1 year) for performance, and/or move hero rules to vercel.json.
    minimumCacheTTL: 3600,
  },

  // Add targeted cache headers for frequently-updated hero art in /public/images/.
  async headers() {
    return [
      {
        // Match both AVIF and JPG hero assets
        source: "/images/:hero(hero-(desktop|tablet|mobile)).:ext(avif|jpg)",
        headers: [
          // Short browser cache to avoid sticky old images after a swap
          { key: "Cache-Control", value: "public, max-age=300, must-revalidate" },
          // Short CDN cache + generous SWR so viewers get instant responses while we revalidate
          { key: "Surrogate-Control", value: "s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  // Nice-to-haves
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

export default nextConfig;
