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
      /* Hero MP4 — cache, but not immutable: the file is replaced in-place
         during development and a forever-immutable header stuck browsers on
         a stale/broken body. Leave Content-Type to the static file server so
         byte-range requests stay intact. */
      {
        source: "/hero-video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
