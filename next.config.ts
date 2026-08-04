import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // MetaMask SDK pulls in a React Native-only module; stub it in the browser bundle
    // so Next.js Fast Refresh doesn't loop on "Module not found".
    // Coinbase SDK's optional x402 payment feature also pulls in packages
    // we don't use/install — stub those too so the build doesn't fail.
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "@x402/evm/upto/client": false,
      "@x402/evm/exact/client": false,
      "@x402/core/client": false,
      "@x402/svm/exact/client": false,
      "@x402/evm": false,
    };
    return config;
  },
};

export default nextConfig;