import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* The driver application lives at /drive-for-us (matches the client's
         live-site URL). Keep the old /drivers path working for links that
         already point at it. */
      { source: "/drivers", destination: "/drive-for-us", permanent: false },
    ];
  },
  async headers() {
    return [
      /* Hero MP4 — allow progressive byte-range streaming and long cache.
         Accept-Ranges comes from the static file server; Cache-Control helps
         repeat visits start instantly. */
      {
        source: "/hero-video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Content-Type", value: "video/mp4" },
        ],
      },
    ];
  },
};

export default nextConfig;
