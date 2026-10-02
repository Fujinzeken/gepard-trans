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
};

export default nextConfig;
