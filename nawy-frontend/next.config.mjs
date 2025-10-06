/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable static optimization to avoid useSearchParams issues
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    STATIC_URL: process.env.STATIC_URL,
    DEFAULT_PAGE: process.env.DEFAULT_PAGE,
    DEFAULT_TAKE: process.env.DEFAULT_TAKE,
    MAX_TAKE: process.env.MAX_TAKE,
    DEBOUNCE_DELAY: process.env.DEBOUNCE_DELAY,
  },
};

export default nextConfig;
