import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP as the fallback. AVIF is typically 20 to 30 percent
       smaller than WebP at the same quality, and this site is carried almost
       entirely by photography, so the saving is worth the extra encode time
       at build. Browsers that support neither still get the original JPEG. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
