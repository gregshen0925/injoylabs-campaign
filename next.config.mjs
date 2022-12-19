// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "i.imgur.com",
      "ipfs.io",
      "raw.githubusercontent.com",
      "static.risewallet.io",
      "miro.medium.com",
      "www.gitbook.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // this is for ignoring ./node_modules/aptos/src/generated/core/request.ts:57:29
    ignoreBuildErrors: true,
  },
};
export default config;
