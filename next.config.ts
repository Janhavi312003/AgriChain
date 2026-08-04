import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // MetaMask SDK pulls in a React Native-only module; stub it in the browser bundle
    // so Next.js Fast Refresh doesn't loop on "Module not found".
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  },
};

export default nextConfig;
