import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site into `out/` — no Node.js server needed,
  // so it can be uploaded to any static/Apache host (e.g. FreeHosting.com).
  output: "export",
  // The static export can't run Next's on-the-fly image optimizer,
  // so images are served as-is.
  images: { unoptimized: true },
  // Emit directory-style URLs (/projects/foo/index.html) so Apache serves
  // them without any rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
