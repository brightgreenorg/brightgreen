// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // AVIF only; non‑AVIF browsers will fall back to the original JPEG.
    formats: ["image/avif"],

    // Same responsive sizes as before.
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Assume frequent updates: cache optimized variants for just 1 hour.
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
