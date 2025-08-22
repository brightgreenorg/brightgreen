// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Only offer AVIF as a modern format; browsers without AVIF get the original JPEG.
    formats: ["image/avif"],

    // Helpful defaults for responsive <Image>; you can tweak if analytics suggest otherwise.
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized variants at the edge/CDN (in seconds). 1 year is standard for static hero art.
    minimumCacheTTL: 31536000,
  },

  // Keep builds lean; SWC minify is default in your Next 14.x, but explicit is fine.
  swcMinify: true,
};

module.exports = nextConfig;
