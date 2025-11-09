/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// Only apply PWA in production
if (process.env.NODE_ENV !== 'development') {
  const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })
  module.exports = withPWA(nextConfig)
} else {
  module.exports = nextConfig
}
