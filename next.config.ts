import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingIncludes: { "/api/documents/[document]": ["./*.pdf"] },
};

export default nextConfig;
