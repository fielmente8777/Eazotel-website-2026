import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   unoptimized: true,
  // },
  experimental: {
    esmExternals: true, // helps prefer modern builds
    optimizePackageImports: ["lodash", "date-fns", "react-icons"],
    optimizeCss: true,
    optimizeServerReact: true,
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  productionBrowserSourceMaps: true,
  trailingSlash: true,
};

export default nextConfig;
