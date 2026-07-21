import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits an out/ folder of HTML/JS/CSS
  // that can be hosted on any static host (S3, Netlify, GitHub Pages...).
  output: "export",
  reactStrictMode: true,
  // Trailing slashes keep static hosts happy with directory-style routing.
  trailingSlash: true,
  images: {
    // The Next Image Optimization server doesn't exist in a static export,
    // so images are served as-is. Our sources are already right-sized.
    unoptimized: true,
    // Product placeholders are local SVGs in /public/images.
    // Safe because they're our own committed files, not user uploads.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
